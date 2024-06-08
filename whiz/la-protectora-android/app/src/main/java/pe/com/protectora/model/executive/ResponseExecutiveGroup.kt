package pe.com.protectora.model.executive

data class ResponseExecutiveGroup(
    val data: MutableList<MutableList<ExecutiveGroup>>,
    val status: Boolean
)