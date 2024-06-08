package pe.com.protectora.feature.blog

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import pe.com.protectora.model.blog.Blog
import pe.com.protectora.model.blog.CategoryBlog
import pe.com.protectora.model.blog.SubCategory
import pe.com.protectora.network.OperationResult

class BlogViewModel(
    private val repository: BlogRepository
) : ViewModel() {

    private val _listBlog = MutableLiveData<List<Blog>>()
    val listBlog: LiveData<List<Blog>> = _listBlog

    private val _listCategoryBlog = MutableLiveData<List<CategoryBlog>>()
    val listCategoryBlog: LiveData<List<CategoryBlog>> = _listCategoryBlog

    private val _listSubCategoryBlog = MutableLiveData<List<SubCategory>>()
    val listSubCategoryBlog: LiveData<List<SubCategory>> = _listSubCategoryBlog

    private val _listPostxSubCategory = MutableLiveData<List<Blog>>()
    val listPostxSubCategory: LiveData<List<Blog>> = _listPostxSubCategory

    val listRecentPost = MutableLiveData<List<Blog>>()

    val listRecentPostSubCategory = MutableLiveData<List<Blog>>()


    private val _showLoading = MutableLiveData<Boolean>()
    val showLoading: LiveData<Boolean>
        get() = _showLoading

    private var start = 1
    private var startPostxSubCategory = 1
    private var range = 10


    fun getPostTop() {
        viewModelScope.launch {
            val response = repository.getTopBlog()
            when (response) {
                is OperationResult.Success -> {
                    val data = response.result
                    _listBlog.postValue(data)
                }
                is OperationResult.Error -> {
                }
            }
        }
    }


    fun getCategories() {
        viewModelScope.launch {
            val response = repository.getCategories()
            when (response) {
                is OperationResult.Success -> {
                    val data = response.result
                    _listCategoryBlog.postValue(data)
                }
                is OperationResult.Error -> {
                }
            }
        }
    }

    fun getSubCategories(id: String) {
        viewModelScope.launch {
            _showLoading.postValue(true)
            val response = withContext(Dispatchers.IO) { repository.getSubCategory(id) }
            when (response) {
                is OperationResult.Success -> {
                    val data = response.result
                    _listSubCategoryBlog.postValue(data)
                    _showLoading.postValue(false)
                }
                is OperationResult.Error -> {
                    _showLoading.postValue(false)
                }
            }
        }
    }

    fun getPostxSubCategory(id: String) {
        viewModelScope.launch {
            _showLoading.postValue(true)
            val response = withContext(Dispatchers.IO) { repository.getPostxSubCategory(id) }
            when (response) {
                is OperationResult.Success -> {
                    val data = response.result
                    _listPostxSubCategory.postValue(data)
                    _showLoading.postValue(false)

                }
                is OperationResult.Error -> {
                    _showLoading.postValue(false)

                }
            }
        }
    }

    fun getRecentPost() {
        CoroutineScope(Dispatchers.IO).launch {
            _showLoading.postValue(true)
            val response =
                repository.getRecentPost(
                    start = start, range = range)

            when (response) {
                is OperationResult.Success -> {
                    val data = response.result
                    listRecentPost.postValue(data)
                    start += range
                    _showLoading.postValue(false)
                }
                is OperationResult.Error -> {
                    _showLoading.postValue(false)
                }
            }
        }
    }

    fun getRecentPostCategory(categoryId: String) {
        CoroutineScope(Dispatchers.IO).launch {
            _showLoading.postValue(true)
            val response =
                repository.getRecentPostxSubCategory(
                    categoryId, startPostxSubCategory, range
                )
            when (response) {
                is OperationResult.Success -> {
                    val data = response.result
                    listRecentPostSubCategory.postValue(data)
                    startPostxSubCategory += range
                    _showLoading.postValue(false)
                }
                is OperationResult.Error -> {
                    _showLoading.postValue(false)
                }
            }
        }
    }


}