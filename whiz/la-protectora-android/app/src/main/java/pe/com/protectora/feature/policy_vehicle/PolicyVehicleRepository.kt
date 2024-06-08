package pe.com.protectora.feature.policy_vehicle

import pe.com.protectora.model.policy_car.RequestPolicyCar
import pe.com.protectora.model.policy_car.ResponsePolicyCar

interface PolicyVehicleRepository {
    suspend fun getPolicies(token:String,requestPolicyCar: RequestPolicyCar): ResponsePolicyCar?
}