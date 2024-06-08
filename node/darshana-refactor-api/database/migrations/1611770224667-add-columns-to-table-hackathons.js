const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`ALTER TABLE hackathons
    ADD COLUMN title VARCHAR(255),
    ADD COLUMN title_es VARCHAR(255),
    ADD COLUMN image_url VARCHAR(255),
    ADD COLUMN image_url_es VARCHAR(255),
    ADD COLUMN summary TEXT,
    ADD COLUMN summary_es TEXT,
    ADD COLUMN date_start_enrollment DATE,
    ADD COLUMN date_finish_enrollment DATE,
    ADD COLUMN date_start_event DATE,
    ADD COLUMN date_finish_event DATE,
    ADD COLUMN date_results DATE,
    ADD COLUMN theme_description TEXT,
    ADD COLUMN theme_description_es TEXT,
    ADD COLUMN theme_image_url VARCHAR(255),
    ADD COLUMN theme_image_url_es VARCHAR(255),
    ADD COLUMN evaluation_description TEXT,
    ADD COLUMN evaluation_image_url VARCHAR(255),
    ADD COLUMN evaluation_image_url_es VARCHAR(255),
    ADD COLUMN rules_description TEXT,
    ADD COLUMN rules_description_es TEXT,
    ADD COLUMN rules_pdf TEXT,
    ADD COLUMN rules_pdf_es TEXT,
    ADD COLUMN politics_description TEXT,
    ADD COLUMN politics_description_es TEXT,
    ADD COLUMN politics_pdf TEXT,
    ADD COLUMN politics_pdf_es TEXT,
    DROP COLUMN name,
    DROP COLUMN name_es;
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);

  await query(`ALTER TABLE hackathons
    DROP COLUMN title,
    DROP COLUMN title_es,
    DROP COLUMN image_url,
    DROP COLUMN image_url_es,
    DROP COLUMN summary,
    DROP COLUMN summary_es,
    DROP COLUMN date_start_enrollment,
    DROP COLUMN date_finish_enrollment,
    DROP COLUMN date_start_event,
    DROP COLUMN date_finish_event,
    DROP COLUMN date_results,
    DROP COLUMN theme_description,
    DROP COLUMN theme_description_es,
    DROP COLUMN theme_image_url,
    DROP COLUMN theme_image_url_es,
    DROP COLUMN evaluation_description,
    DROP COLUMN evaluation_image_url,
    DROP COLUMN evaluation_image_url_es,
    DROP COLUMN rules_description,
    DROP COLUMN rules_description_es,
    DROP COLUMN rules_pdf,
    DROP COLUMN rules_pdf_es,
    DROP COLUMN politics_description,
    DROP COLUMN politics_description_es,
    DROP COLUMN politics_pdf,
    DROP COLUMN politics_pdf_es,
    ADD COLUMN name VARCHAR(255),
    ADD COLUMN name_es VARCHAR(255);`);
}

module.exports = { up, down }