const dotenv = require("dotenv");
dotenv.config();
const culqi = {
  // Produccion
  // public_key: 'pk_live_1FkDftS8RAmFD82l',
  // private_key: 'sk_live_edVN0Ei4AdfOonTT'

  // Desarrollo
  public_key: process.env.PUBLIC_KEY,
  private_key: process.env.PRIVATE_KEY,
};

export default culqi;
