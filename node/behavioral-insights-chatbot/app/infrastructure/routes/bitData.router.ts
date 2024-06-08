import { Router } from "express";
import { MetadataController } from "../controllers/metadata.controller";


const bitDataRouter = Router()
const metadataController = new MetadataController()

bitDataRouter.get('/', metadataController.getMetadata)

export default bitDataRouter