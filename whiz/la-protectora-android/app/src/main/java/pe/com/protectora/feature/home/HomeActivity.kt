package pe.com.protectora.feature.home

import android.Manifest
import android.annotation.SuppressLint
import android.app.Dialog
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Bundle
import android.util.Log
import android.view.ViewGroup
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentManager
import androidx.fragment.app.FragmentTransaction
import androidx.lifecycle.Observer
import androidx.work.Data
import androidx.work.ExistingWorkPolicy
import androidx.work.OneTimeWorkRequest
import androidx.work.WorkManager
import com.google.gson.Gson
import kotlinx.android.synthetic.main.activity_home.*
import kotlinx.android.synthetic.main.dialog_logout.*
import org.koin.android.viewmodel.ext.android.viewModel
import pe.com.protectora.R
import pe.com.protectora.feature.auth.AuthActivity
import pe.com.protectora.feature.introduction.IntroductionFragment
import pe.com.protectora.feature.policy.PolicyFragment
import pe.com.protectora.feature.profile.ProfileFragment
import pe.com.protectora.feature.sinister.SinisterFragment
import pe.com.protectora.service.NotificationService
import pe.com.protectora.widget.BottomNavigation
import pe.com.protectora.widget.CustomDialog
import pe.com.protectora.widget.convertDate
import pe.com.protectora.worker.NotificationWorker
import pe.com.protectora.worker.NotificationWorker.Companion.NOTIFICATION_ID
import pe.com.protectora.worker.NotificationWorker.Companion.NOTIFICATION_WORK
import java.util.*
import java.util.concurrent.TimeUnit


class HomeActivity : AppCompatActivity() {

    companion object {
        private const val RC_CALL_PHONE = 123
        const val TAB_HOME = "tab_home"
        const val TAB_POLICY = "tab_policy"
        const val TAB_SINISTER = "tab_sinister"
        const val TAB_MORE = "tab_more"
        const val TAB_PROFILE = "tab_profile"
    }

    private val viewModel: HomeViewModel by viewModel()

    private var mStacks: HashMap<String, Stack<Fragment>>? = null
    private var mCurrentTab: String? = null
    var actual_id_tab = ""

    private var linkCotizador: String? = ""

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home)
        initViewModel()
        initBottomNavigation()
        initView()
        validatePermission()
        startService(Intent(this, NotificationService::class.java))

        selectedTab(TAB_HOME)
    }

    private fun initViewModel() {
        viewModel.apply {
            validateNotification.observe(this@HomeActivity, observerNotication())
            logoutSession.observe(this@HomeActivity, observerLogout())
            linkCotizador.observe(this@HomeActivity, observerLinkCotizador())
            refreshToken()
            validationNotification()
            getLinkCotizador()
        }
    }

    private fun observerLinkCotizador() = Observer<String> {
        linkCotizador = it
    }

    private fun observerLogout() = Observer<Boolean> {
        if (!it) {
            startActivity(Intent(this, AuthActivity::class.java))
            finish()
        }
    }

    private fun observerNotication() = Observer<Boolean> {
        if (it) {
            val customCalendar = Calendar.getInstance()
            val currentTime = System.currentTimeMillis()
            val currentDate = convertDate(currentTime.toString(), "dd-M-yyyy")!!.split("-")
            if (viewModel.getUser().getDateTime() != "") {
                val birthday = viewModel.getUser().getDateTime().split("/")
                customCalendar.set(
                    currentDate[2].toInt(), birthday[1].toInt() - 1, birthday[0].toInt(), 9, 0
                )
                val customTime = customCalendar.timeInMillis
                if (customTime > currentTime) {
                    val gson = Gson().toJson(viewModel.getUser())
                    val data =
                        Data.Builder().putInt(NOTIFICATION_ID, 0).putString("user", gson).build()
                    val delay = customTime - currentTime
                    scheduleNotification(delay, data)
                }
            }
            viewModel.updateValidateNotification(false)
        }
    }

    private fun scheduleNotification(delay: Long, data: Data) {
        val notificationWork = OneTimeWorkRequest.Builder(NotificationWorker::class.java)
            .setInitialDelay(delay, TimeUnit.MILLISECONDS).setInputData(data).build()

        val instanceWorkManager = WorkManager.getInstance(this)
        instanceWorkManager.beginUniqueWork(
            NOTIFICATION_WORK,
            ExistingWorkPolicy.REPLACE, notificationWork
        ).enqueue()
    }

    private fun initView() {
        nameText.text = viewModel.getName()

        mStacks = HashMap()
        mStacks?.put(TAB_HOME, Stack<Fragment>())
        mStacks?.put(TAB_POLICY, Stack<Fragment>())
        mStacks?.put(TAB_SINISTER, Stack<Fragment>())
        mStacks?.put(TAB_MORE, Stack<Fragment>())
        mStacks?.put(TAB_PROFILE, Stack<Fragment>())
    }


    private fun initBottomNavigation() {
        bottomNavigation.onClickBottomBar = object : BottomNavigation.OnClickBottomBar {
            override fun onClickHome() {
                selectedTab(TAB_HOME)
                actual_id_tab = "tab_home"
            }

            override fun onClickPolicy() {
                when (viewModel.getType()) {
                    0 -> {
                        CustomDialog.getInstance(this@HomeActivity)
                            .showMessage("Usted aún no es usuario activo de La Protectora.")
                    }
                    1 -> {
                        selectedTab(TAB_POLICY)
                        actual_id_tab = "tab_policy"
                    }
                }
            }

            override fun onClickQuote() {
                Toast.makeText(this@HomeActivity, "Cotizar", Toast.LENGTH_SHORT).show()
            }

            override fun onClickSinister() {
                when (viewModel.getType()) {
                    0 -> {
                        CustomDialog.getInstance(this@HomeActivity)
                            .showMessage("Usted aún no es usuario activo de La Protectora.")
                    }
                    1 -> {
                        selectedTab(TAB_SINISTER)
                    }
                }
            }

            override fun onClickMore() {
                selectedTab(TAB_MORE)
                actual_id_tab = "tab_more"
            }
        }

        cotizarButton.setOnClickListener {
            val browserIntent =
                Intent(
                    Intent.ACTION_VIEW,
                    Uri.parse(linkCotizador)
                )
            startActivity(browserIntent)
        }
    }

    override fun onBackPressed() {
        if (mStacks!![mCurrentTab]!!.size == 1) {
            showDialog()
            return
        }
        popFragments()
    }

    private fun requestPermission() {
        ActivityCompat.requestPermissions(
            this,
            arrayOf(
                Manifest.permission.CALL_PHONE, Manifest.permission.ACCESS_COARSE_LOCATION,
                Manifest.permission.ACCESS_FINE_LOCATION
            ),
            RC_CALL_PHONE
        )
    }

    private fun checkPermissions(): Boolean {
        if (ActivityCompat.checkSelfPermission(
                this,
                Manifest.permission.ACCESS_COARSE_LOCATION
            ) == PackageManager.PERMISSION_GRANTED &&
            ActivityCompat.checkSelfPermission(
                this,
                Manifest.permission.ACCESS_FINE_LOCATION
            ) == PackageManager.PERMISSION_GRANTED &&
            ActivityCompat.checkSelfPermission(
                this,
                Manifest.permission.CALL_PHONE
            ) == PackageManager.PERMISSION_GRANTED
        ) {
            return true
        }
        return false
    }

    @SuppressLint("MissingPermission")
    private fun validatePermission() {
        if (!checkPermissions()) {
            requestPermission()
        }
    }

    private fun selectedTab(tabId: String) {
        mCurrentTab = tabId
        if (mStacks!![tabId]!!.size === 0) {
            when (tabId) {
                TAB_HOME -> {
                    pushFragments(tabId, IntroductionFragment(), true)
                }
                TAB_POLICY -> {
                    pushFragments(tabId, PolicyFragment(), true)
                }
                TAB_SINISTER -> {
                    pushFragments(tabId, SinisterFragment(), true)
                }
                TAB_MORE -> {
                    pushFragments(tabId, ProfileFragment(), true)
                }
            }
        } else {
            pushFragments(tabId, mStacks!![tabId]!!.lastElement(), false)
        }
    }

    fun pushFragments(tag: String?, fragment: Fragment?, shouldAdd: Boolean) {
        if (shouldAdd) mStacks!![tag]?.push(fragment)
        val manager: FragmentManager = supportFragmentManager
        val ft: FragmentTransaction = manager.beginTransaction()
        ft.replace(R.id.contentView, fragment!!)
        ft.commit()
    }

    fun popFragments() {
        val fragment =
            mStacks!![mCurrentTab]!!.elementAt(mStacks!![mCurrentTab]!!.size - 2)
        mStacks!![mCurrentTab]!!.pop()

        val manager: FragmentManager = supportFragmentManager
        val ft: FragmentTransaction = manager.beginTransaction()
        ft.replace(R.id.contentView, fragment)
        ft.commit()
    }

    fun showDialog() {
        val dialog = Dialog(this)
        dialog.setContentView(R.layout.dialog_logout)
        dialog.window?.setLayout(
            ViewGroup.LayoutParams.WRAP_CONTENT,
            ViewGroup.LayoutParams.WRAP_CONTENT
        )
        dialog.setCancelable(false)
        dialog.messageText.setText("¿Estas seguro que deseas salir de la aplicación")
        dialog.acceptButton.setOnClickListener {
            finish()
        }

        dialog.cancelButton.setOnClickListener {
            dialog.dismiss()
        }

        dialog.show()
    }

}
