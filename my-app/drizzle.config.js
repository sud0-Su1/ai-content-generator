/** @type {import("drizzle-kit").Config} */
export default {
    schema: "./utils/schema.ts",
    out: "./drizzle",
    dialect: 'postgresql',
    dbCredentials: {
        url:'postgresql://neondb_owner:npg_a7AG3mXFvCgR@ep-blue-sun-a8r98dkj-pooler.eastus2.azure.neon.tech/Ai-Content-Genrator?sslmode=require',
    }
}