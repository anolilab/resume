import schema from "@anolilab/resume-schema/schema.json";
import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({
    allowUnionTypes: true,
});

addFormats(ajv);

export default ajv.compile(schema);
