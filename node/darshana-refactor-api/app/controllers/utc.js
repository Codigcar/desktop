module.exports = {
  datatable: () => async (req, res) => {
    const now = new Date()
    const utcHours = now.getUTCHours()
    const utcMinutes = now.getUTCMinutes()
    res.json({
      status: true,
      utcHours,
      utcMinutes,
    })
  },
}
