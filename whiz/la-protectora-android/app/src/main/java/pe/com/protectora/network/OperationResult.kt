package pe.com.protectora.network

sealed class OperationResult<out T> {
    data class Success<T>(val result: T) : OperationResult<T>()
    data class Error(val exception:String?) : OperationResult<Nothing>()
}