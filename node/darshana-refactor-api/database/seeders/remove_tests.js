import db from "../../app/models/config/database.js";
import districtModel from "../../app/models/district.js";

export default {
    execute: async () => {
        await db.query('SET SQL_SAFE_UPDATES = 0;\n' +
            '-- BUSINESS\n' +
            'DELETE FROM darshana.business WHERE user_uuid IN ("275e60cb-b59b-4092-9dfa-54caadc7cc64",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"92ad11df-004c-46db-aa66-8a67c38c116f",\n' +
            '"c243e70c-9f93-42fe-ae5d-dd5c6b5c82e9",\n' +
            '"fdea2f74-5826-4860-ad65-e6560ad87e49",\n' +
            '"e7d0c718-72fd-4e0e-b569-40711ed5419f",\n' +
            '"a9c9eda6-60dc-4af1-98cb-58714bd13cb4",\n' +
            '"4ba528d1-932a-46ea-a2c3-3503a90c9aab",\n' +
            '"33adf424-8c04-4859-a9d7-e8a0859e4e1c",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"d2c26f84-3ba1-4d11-90a8-bf95e0162ce7");\n' +
            '\n' +
            '-- CHAT MESSAGES\n' +
            'DELETE FROM darshana.chat_messages WHERE from_user_uuid IN ("275e60cb-b59b-4092-9dfa-54caadc7cc64",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"92ad11df-004c-46db-aa66-8a67c38c116f",\n' +
            '"c243e70c-9f93-42fe-ae5d-dd5c6b5c82e9",\n' +
            '"fdea2f74-5826-4860-ad65-e6560ad87e49",\n' +
            '"e7d0c718-72fd-4e0e-b569-40711ed5419f",\n' +
            '"a9c9eda6-60dc-4af1-98cb-58714bd13cb4",\n' +
            '"4ba528d1-932a-46ea-a2c3-3503a90c9aab",\n' +
            '"33adf424-8c04-4859-a9d7-e8a0859e4e1c",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"d2c26f84-3ba1-4d11-90a8-bf95e0162ce7");\n' +
            'DELETE FROM darshana.chat_messages WHERE to_user_uuid IN ("275e60cb-b59b-4092-9dfa-54caadc7cc64",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"92ad11df-004c-46db-aa66-8a67c38c116f",\n' +
            '"c243e70c-9f93-42fe-ae5d-dd5c6b5c82e9",\n' +
            '"fdea2f74-5826-4860-ad65-e6560ad87e49",\n' +
            '"e7d0c718-72fd-4e0e-b569-40711ed5419f",\n' +
            '"a9c9eda6-60dc-4af1-98cb-58714bd13cb4",\n' +
            '"4ba528d1-932a-46ea-a2c3-3503a90c9aab",\n' +
            '"33adf424-8c04-4859-a9d7-e8a0859e4e1c",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"d2c26f84-3ba1-4d11-90a8-bf95e0162ce7");\n' +
            '\n' +
            '--FORUM BANNED COMMENTS\n' +
            'DELETE FROM darshana.forum_banned_comments WHERE user_uuid IN ("275e60cb-b59b-4092-9dfa-54caadc7cc64",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"92ad11df-004c-46db-aa66-8a67c38c116f",\n' +
            '"c243e70c-9f93-42fe-ae5d-dd5c6b5c82e9",\n' +
            '"fdea2f74-5826-4860-ad65-e6560ad87e49",\n' +
            '"e7d0c718-72fd-4e0e-b569-40711ed5419f",\n' +
            '"a9c9eda6-60dc-4af1-98cb-58714bd13cb4",\n' +
            '"4ba528d1-932a-46ea-a2c3-3503a90c9aab",\n' +
            '"33adf424-8c04-4859-a9d7-e8a0859e4e1c",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"d2c26f84-3ba1-4d11-90a8-bf95e0162ce7");\n' +
            '\n' +
            '--FORUM BANNED POSTS\n' +
            'DELETE FROM darshana.forum_banned_posts WHERE user_uuid IN ("275e60cb-b59b-4092-9dfa-54caadc7cc64",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"92ad11df-004c-46db-aa66-8a67c38c116f",\n' +
            '"c243e70c-9f93-42fe-ae5d-dd5c6b5c82e9",\n' +
            '"fdea2f74-5826-4860-ad65-e6560ad87e49",\n' +
            '"e7d0c718-72fd-4e0e-b569-40711ed5419f",\n' +
            '"a9c9eda6-60dc-4af1-98cb-58714bd13cb4",\n' +
            '"4ba528d1-932a-46ea-a2c3-3503a90c9aab",\n' +
            '"33adf424-8c04-4859-a9d7-e8a0859e4e1c",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"d2c26f84-3ba1-4d11-90a8-bf95e0162ce7");\n' +
            '\n' +
            '--FORUM BANNED USERS\n' +
            'DELETE FROM darshana.forum_banned_users WHERE user_uuid IN ("275e60cb-b59b-4092-9dfa-54caadc7cc64",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"92ad11df-004c-46db-aa66-8a67c38c116f",\n' +
            '"c243e70c-9f93-42fe-ae5d-dd5c6b5c82e9",\n' +
            '"fdea2f74-5826-4860-ad65-e6560ad87e49",\n' +
            '"e7d0c718-72fd-4e0e-b569-40711ed5419f",\n' +
            '"a9c9eda6-60dc-4af1-98cb-58714bd13cb4",\n' +
            '"4ba528d1-932a-46ea-a2c3-3503a90c9aab",\n' +
            '"33adf424-8c04-4859-a9d7-e8a0859e4e1c",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"d2c26f84-3ba1-4d11-90a8-bf95e0162ce7");\n' +
            '\n' +
            '--FORUM COMMENTS\n' +
            'DELETE FROM darshana.forum_comments WHERE user_uuid IN ("275e60cb-b59b-4092-9dfa-54caadc7cc64",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"92ad11df-004c-46db-aa66-8a67c38c116f",\n' +
            '"c243e70c-9f93-42fe-ae5d-dd5c6b5c82e9",\n' +
            '"fdea2f74-5826-4860-ad65-e6560ad87e49",\n' +
            '"e7d0c718-72fd-4e0e-b569-40711ed5419f",\n' +
            '"a9c9eda6-60dc-4af1-98cb-58714bd13cb4",\n' +
            '"4ba528d1-932a-46ea-a2c3-3503a90c9aab",\n' +
            '"33adf424-8c04-4859-a9d7-e8a0859e4e1c",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"d2c26f84-3ba1-4d11-90a8-bf95e0162ce7");\n' +
            '\n' +
            '--FORUM FEATURED COMMENTS\n' +
            'DELETE FROM darshana.forum_featured_comments WHERE user_uuid IN ("275e60cb-b59b-4092-9dfa-54caadc7cc64",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"92ad11df-004c-46db-aa66-8a67c38c116f",\n' +
            '"c243e70c-9f93-42fe-ae5d-dd5c6b5c82e9",\n' +
            '"fdea2f74-5826-4860-ad65-e6560ad87e49",\n' +
            '"e7d0c718-72fd-4e0e-b569-40711ed5419f",\n' +
            '"a9c9eda6-60dc-4af1-98cb-58714bd13cb4",\n' +
            '"4ba528d1-932a-46ea-a2c3-3503a90c9aab",\n' +
            '"33adf424-8c04-4859-a9d7-e8a0859e4e1c",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"d2c26f84-3ba1-4d11-90a8-bf95e0162ce7");\n' +
            '\n' +
            '--FORUM FEATURED POSTS\n' +
            'DELETE FROM darshana.forum_featured_posts WHERE user_uuid IN ("275e60cb-b59b-4092-9dfa-54caadc7cc64",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"92ad11df-004c-46db-aa66-8a67c38c116f",\n' +
            '"c243e70c-9f93-42fe-ae5d-dd5c6b5c82e9",\n' +
            '"fdea2f74-5826-4860-ad65-e6560ad87e49",\n' +
            '"e7d0c718-72fd-4e0e-b569-40711ed5419f",\n' +
            '"a9c9eda6-60dc-4af1-98cb-58714bd13cb4",\n' +
            '"4ba528d1-932a-46ea-a2c3-3503a90c9aab",\n' +
            '"33adf424-8c04-4859-a9d7-e8a0859e4e1c",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"d2c26f84-3ba1-4d11-90a8-bf95e0162ce7");\n' +
            '\n' +
            '--FORUM POSTS\n' +
            'DELETE FROM darshana.forum_posts WHERE user_uuid IN ("275e60cb-b59b-4092-9dfa-54caadc7cc64",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"92ad11df-004c-46db-aa66-8a67c38c116f",\n' +
            '"c243e70c-9f93-42fe-ae5d-dd5c6b5c82e9",\n' +
            '"fdea2f74-5826-4860-ad65-e6560ad87e49",\n' +
            '"e7d0c718-72fd-4e0e-b569-40711ed5419f",\n' +
            '"a9c9eda6-60dc-4af1-98cb-58714bd13cb4",\n' +
            '"4ba528d1-932a-46ea-a2c3-3503a90c9aab",\n' +
            '"33adf424-8c04-4859-a9d7-e8a0859e4e1c",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"d2c26f84-3ba1-4d11-90a8-bf95e0162ce7");\n' +
            '\n' +
            '--FORUM SUSPENDED COMMENTS\n' +
            'DELETE FROM darshana.forum_suspended_comments WHERE user_uuid IN ("275e60cb-b59b-4092-9dfa-54caadc7cc64",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"92ad11df-004c-46db-aa66-8a67c38c116f",\n' +
            '"c243e70c-9f93-42fe-ae5d-dd5c6b5c82e9",\n' +
            '"fdea2f74-5826-4860-ad65-e6560ad87e49",\n' +
            '"e7d0c718-72fd-4e0e-b569-40711ed5419f",\n' +
            '"a9c9eda6-60dc-4af1-98cb-58714bd13cb4",\n' +
            '"4ba528d1-932a-46ea-a2c3-3503a90c9aab",\n' +
            '"33adf424-8c04-4859-a9d7-e8a0859e4e1c",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"d2c26f84-3ba1-4d11-90a8-bf95e0162ce7");\n' +
            '\n' +
            '--FORUM SUSPENDED POSTS\n' +
            'DELETE FROM darshana.forum_suspended_posts WHERE user_uuid IN ("275e60cb-b59b-4092-9dfa-54caadc7cc64",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"92ad11df-004c-46db-aa66-8a67c38c116f",\n' +
            '"c243e70c-9f93-42fe-ae5d-dd5c6b5c82e9",\n' +
            '"fdea2f74-5826-4860-ad65-e6560ad87e49",\n' +
            '"e7d0c718-72fd-4e0e-b569-40711ed5419f",\n' +
            '"a9c9eda6-60dc-4af1-98cb-58714bd13cb4",\n' +
            '"4ba528d1-932a-46ea-a2c3-3503a90c9aab",\n' +
            '"33adf424-8c04-4859-a9d7-e8a0859e4e1c",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"d2c26f84-3ba1-4d11-90a8-bf95e0162ce7");\n' +
            '\n' +
            '--FORUM SUSPENDED USERS\n' +
            'DELETE FROM darshana.forum_suspended_users WHERE user_uuid IN ("275e60cb-b59b-4092-9dfa-54caadc7cc64",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"92ad11df-004c-46db-aa66-8a67c38c116f",\n' +
            '"c243e70c-9f93-42fe-ae5d-dd5c6b5c82e9",\n' +
            '"fdea2f74-5826-4860-ad65-e6560ad87e49",\n' +
            '"e7d0c718-72fd-4e0e-b569-40711ed5419f",\n' +
            '"a9c9eda6-60dc-4af1-98cb-58714bd13cb4",\n' +
            '"4ba528d1-932a-46ea-a2c3-3503a90c9aab",\n' +
            '"33adf424-8c04-4859-a9d7-e8a0859e4e1c",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"d2c26f84-3ba1-4d11-90a8-bf95e0162ce7");\n' +
            '\n' +
            '--HACKATHON USERS\n' +
            'DELETE FROM darshana.hackathon_users WHERE user_uuid IN ("275e60cb-b59b-4092-9dfa-54caadc7cc64",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"92ad11df-004c-46db-aa66-8a67c38c116f",\n' +
            '"c243e70c-9f93-42fe-ae5d-dd5c6b5c82e9",\n' +
            '"fdea2f74-5826-4860-ad65-e6560ad87e49",\n' +
            '"e7d0c718-72fd-4e0e-b569-40711ed5419f",\n' +
            '"a9c9eda6-60dc-4af1-98cb-58714bd13cb4",\n' +
            '"4ba528d1-932a-46ea-a2c3-3503a90c9aab",\n' +
            '"33adf424-8c04-4859-a9d7-e8a0859e4e1c",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"d2c26f84-3ba1-4d11-90a8-bf95e0162ce7");\n' +
            '\n' +
            '--JOB APPLICATIONS\n' +
            'DELETE FROM darshana.job_applications WHERE user_uuid IN ("275e60cb-b59b-4092-9dfa-54caadc7cc64",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"92ad11df-004c-46db-aa66-8a67c38c116f",\n' +
            '"c243e70c-9f93-42fe-ae5d-dd5c6b5c82e9",\n' +
            '"fdea2f74-5826-4860-ad65-e6560ad87e49",\n' +
            '"e7d0c718-72fd-4e0e-b569-40711ed5419f",\n' +
            '"a9c9eda6-60dc-4af1-98cb-58714bd13cb4",\n' +
            '"4ba528d1-932a-46ea-a2c3-3503a90c9aab",\n' +
            '"33adf424-8c04-4859-a9d7-e8a0859e4e1c",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"d2c26f84-3ba1-4d11-90a8-bf95e0162ce7");\n' +
            '\n' +
            '--NOTIFICATIONS\n' +
            'DELETE FROM darshana.notifications WHERE user_uuid IN ("275e60cb-b59b-4092-9dfa-54caadc7cc64",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"92ad11df-004c-46db-aa66-8a67c38c116f",\n' +
            '"c243e70c-9f93-42fe-ae5d-dd5c6b5c82e9",\n' +
            '"fdea2f74-5826-4860-ad65-e6560ad87e49",\n' +
            '"e7d0c718-72fd-4e0e-b569-40711ed5419f",\n' +
            '"a9c9eda6-60dc-4af1-98cb-58714bd13cb4",\n' +
            '"4ba528d1-932a-46ea-a2c3-3503a90c9aab",\n' +
            '"33adf424-8c04-4859-a9d7-e8a0859e4e1c",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"d2c26f84-3ba1-4d11-90a8-bf95e0162ce7");\n' +
            '\n' +
            '\n' +
            '--PROJECT APPLICATION FILES\n' +
            'DELETE FROM darshana.project_application_files WHERE user_uuid IN ("275e60cb-b59b-4092-9dfa-54caadc7cc64",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"92ad11df-004c-46db-aa66-8a67c38c116f",\n' +
            '"c243e70c-9f93-42fe-ae5d-dd5c6b5c82e9",\n' +
            '"fdea2f74-5826-4860-ad65-e6560ad87e49",\n' +
            '"e7d0c718-72fd-4e0e-b569-40711ed5419f",\n' +
            '"a9c9eda6-60dc-4af1-98cb-58714bd13cb4",\n' +
            '"4ba528d1-932a-46ea-a2c3-3503a90c9aab",\n' +
            '"33adf424-8c04-4859-a9d7-e8a0859e4e1c",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"d2c26f84-3ba1-4d11-90a8-bf95e0162ce7");\n' +
            '\n' +
            '--PROJECT APPLICATION\n' +
            'DELETE FROM darshana.project_applications WHERE user_uuid IN ("275e60cb-b59b-4092-9dfa-54caadc7cc64",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"92ad11df-004c-46db-aa66-8a67c38c116f",\n' +
            '"c243e70c-9f93-42fe-ae5d-dd5c6b5c82e9",\n' +
            '"fdea2f74-5826-4860-ad65-e6560ad87e49",\n' +
            '"e7d0c718-72fd-4e0e-b569-40711ed5419f",\n' +
            '"a9c9eda6-60dc-4af1-98cb-58714bd13cb4",\n' +
            '"4ba528d1-932a-46ea-a2c3-3503a90c9aab",\n' +
            '"33adf424-8c04-4859-a9d7-e8a0859e4e1c",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"d2c26f84-3ba1-4d11-90a8-bf95e0162ce7");\n' +
            '\n' +
            '--RECOVERY CODES\n' +
            'DELETE FROM darshana.recovery_codes WHERE user_uuid IN ("275e60cb-b59b-4092-9dfa-54caadc7cc64",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"92ad11df-004c-46db-aa66-8a67c38c116f",\n' +
            '"c243e70c-9f93-42fe-ae5d-dd5c6b5c82e9",\n' +
            '"fdea2f74-5826-4860-ad65-e6560ad87e49",\n' +
            '"e7d0c718-72fd-4e0e-b569-40711ed5419f",\n' +
            '"a9c9eda6-60dc-4af1-98cb-58714bd13cb4",\n' +
            '"4ba528d1-932a-46ea-a2c3-3503a90c9aab",\n' +
            '"33adf424-8c04-4859-a9d7-e8a0859e4e1c",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"d2c26f84-3ba1-4d11-90a8-bf95e0162ce7");\n' +
            '\n' +
            '--RECRUITERS\n' +
            'DELETE FROM darshana.recruiters WHERE user_uuid IN ("275e60cb-b59b-4092-9dfa-54caadc7cc64",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"92ad11df-004c-46db-aa66-8a67c38c116f",\n' +
            '"c243e70c-9f93-42fe-ae5d-dd5c6b5c82e9",\n' +
            '"fdea2f74-5826-4860-ad65-e6560ad87e49",\n' +
            '"e7d0c718-72fd-4e0e-b569-40711ed5419f",\n' +
            '"a9c9eda6-60dc-4af1-98cb-58714bd13cb4",\n' +
            '"4ba528d1-932a-46ea-a2c3-3503a90c9aab",\n' +
            '"33adf424-8c04-4859-a9d7-e8a0859e4e1c",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"d2c26f84-3ba1-4d11-90a8-bf95e0162ce7");\n' +
            '\n' +
            '--TIMER\n' +
            'DELETE FROM darshana.timer WHERE user_uuid IN ("275e60cb-b59b-4092-9dfa-54caadc7cc64",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"92ad11df-004c-46db-aa66-8a67c38c116f",\n' +
            '"c243e70c-9f93-42fe-ae5d-dd5c6b5c82e9",\n' +
            '"fdea2f74-5826-4860-ad65-e6560ad87e49",\n' +
            '"e7d0c718-72fd-4e0e-b569-40711ed5419f",\n' +
            '"a9c9eda6-60dc-4af1-98cb-58714bd13cb4",\n' +
            '"4ba528d1-932a-46ea-a2c3-3503a90c9aab",\n' +
            '"33adf424-8c04-4859-a9d7-e8a0859e4e1c",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"d2c26f84-3ba1-4d11-90a8-bf95e0162ce7");\n' +
            '\n' +
            '--USER DETAILS\n' +
            'DELETE FROM darshana.user_details WHERE user_uuid IN ("275e60cb-b59b-4092-9dfa-54caadc7cc64",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"92ad11df-004c-46db-aa66-8a67c38c116f",\n' +
            '"c243e70c-9f93-42fe-ae5d-dd5c6b5c82e9",\n' +
            '"fdea2f74-5826-4860-ad65-e6560ad87e49",\n' +
            '"e7d0c718-72fd-4e0e-b569-40711ed5419f",\n' +
            '"a9c9eda6-60dc-4af1-98cb-58714bd13cb4",\n' +
            '"4ba528d1-932a-46ea-a2c3-3503a90c9aab",\n' +
            '"33adf424-8c04-4859-a9d7-e8a0859e4e1c",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"d2c26f84-3ba1-4d11-90a8-bf95e0162ce7");\n' +
            '\n' +
            '--USER FAVORITES\n' +
            'DELETE FROM darshana.user_favorites WHERE user_uuid IN ("275e60cb-b59b-4092-9dfa-54caadc7cc64",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"92ad11df-004c-46db-aa66-8a67c38c116f",\n' +
            '"c243e70c-9f93-42fe-ae5d-dd5c6b5c82e9",\n' +
            '"fdea2f74-5826-4860-ad65-e6560ad87e49",\n' +
            '"e7d0c718-72fd-4e0e-b569-40711ed5419f",\n' +
            '"a9c9eda6-60dc-4af1-98cb-58714bd13cb4",\n' +
            '"4ba528d1-932a-46ea-a2c3-3503a90c9aab",\n' +
            '"33adf424-8c04-4859-a9d7-e8a0859e4e1c",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"d2c26f84-3ba1-4d11-90a8-bf95e0162ce7");\n' +
            '\n' +
            '--USER FOLLOWERS\n' +
            'DELETE FROM darshana.user_followers WHERE user_uuid IN ("275e60cb-b59b-4092-9dfa-54caadc7cc64",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"92ad11df-004c-46db-aa66-8a67c38c116f",\n' +
            '"c243e70c-9f93-42fe-ae5d-dd5c6b5c82e9",\n' +
            '"fdea2f74-5826-4860-ad65-e6560ad87e49",\n' +
            '"e7d0c718-72fd-4e0e-b569-40711ed5419f",\n' +
            '"a9c9eda6-60dc-4af1-98cb-58714bd13cb4",\n' +
            '"4ba528d1-932a-46ea-a2c3-3503a90c9aab",\n' +
            '"33adf424-8c04-4859-a9d7-e8a0859e4e1c",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"d2c26f84-3ba1-4d11-90a8-bf95e0162ce7");\n' +
            '\n' +
            '--USER SKILLS\n' +
            'DELETE FROM darshana.user_skills WHERE user_uuid IN ("275e60cb-b59b-4092-9dfa-54caadc7cc64",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"92ad11df-004c-46db-aa66-8a67c38c116f",\n' +
            '"c243e70c-9f93-42fe-ae5d-dd5c6b5c82e9",\n' +
            '"fdea2f74-5826-4860-ad65-e6560ad87e49",\n' +
            '"e7d0c718-72fd-4e0e-b569-40711ed5419f",\n' +
            '"a9c9eda6-60dc-4af1-98cb-58714bd13cb4",\n' +
            '"4ba528d1-932a-46ea-a2c3-3503a90c9aab",\n' +
            '"33adf424-8c04-4859-a9d7-e8a0859e4e1c",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"d2c26f84-3ba1-4d11-90a8-bf95e0162ce7");\n' +
            '\n' +
            '--USER STUDY CENTRES\n' +
            'DELETE FROM darshana.user_study_centres WHERE user_uuid IN ("275e60cb-b59b-4092-9dfa-54caadc7cc64",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"92ad11df-004c-46db-aa66-8a67c38c116f",\n' +
            '"c243e70c-9f93-42fe-ae5d-dd5c6b5c82e9",\n' +
            '"fdea2f74-5826-4860-ad65-e6560ad87e49",\n' +
            '"e7d0c718-72fd-4e0e-b569-40711ed5419f",\n' +
            '"a9c9eda6-60dc-4af1-98cb-58714bd13cb4",\n' +
            '"4ba528d1-932a-46ea-a2c3-3503a90c9aab",\n' +
            '"33adf424-8c04-4859-a9d7-e8a0859e4e1c",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"d2c26f84-3ba1-4d11-90a8-bf95e0162ce7");\n' +
            '\n' +
            '--USER WORKPLACE\n' +
            'DELETE FROM darshana.user_workplaces WHERE user_uuid IN ("275e60cb-b59b-4092-9dfa-54caadc7cc64",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"92ad11df-004c-46db-aa66-8a67c38c116f",\n' +
            '"c243e70c-9f93-42fe-ae5d-dd5c6b5c82e9",\n' +
            '"fdea2f74-5826-4860-ad65-e6560ad87e49",\n' +
            '"e7d0c718-72fd-4e0e-b569-40711ed5419f",\n' +
            '"a9c9eda6-60dc-4af1-98cb-58714bd13cb4",\n' +
            '"4ba528d1-932a-46ea-a2c3-3503a90c9aab",\n' +
            '"33adf424-8c04-4859-a9d7-e8a0859e4e1c",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"d2c26f84-3ba1-4d11-90a8-bf95e0162ce7");\n' +
            '\n' +
            '\n' +
            '--USER CACHE\n' +
            'DELETE FROM darshana.users_cache WHERE uuid IN ("275e60cb-b59b-4092-9dfa-54caadc7cc64",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"92ad11df-004c-46db-aa66-8a67c38c116f",\n' +
            '"c243e70c-9f93-42fe-ae5d-dd5c6b5c82e9",\n' +
            '"fdea2f74-5826-4860-ad65-e6560ad87e49",\n' +
            '"e7d0c718-72fd-4e0e-b569-40711ed5419f",\n' +
            '"a9c9eda6-60dc-4af1-98cb-58714bd13cb4",\n' +
            '"4ba528d1-932a-46ea-a2c3-3503a90c9aab",\n' +
            '"33adf424-8c04-4859-a9d7-e8a0859e4e1c",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"d2c26f84-3ba1-4d11-90a8-bf95e0162ce7");\n' +
            '\n' +
            '--USER WHIZ CACHE\n' +
            'DELETE FROM darshana.whiz_user_cache WHERE uuid IN ("275e60cb-b59b-4092-9dfa-54caadc7cc64",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"92ad11df-004c-46db-aa66-8a67c38c116f",\n' +
            '"c243e70c-9f93-42fe-ae5d-dd5c6b5c82e9",\n' +
            '"fdea2f74-5826-4860-ad65-e6560ad87e49",\n' +
            '"e7d0c718-72fd-4e0e-b569-40711ed5419f",\n' +
            '"a9c9eda6-60dc-4af1-98cb-58714bd13cb4",\n' +
            '"4ba528d1-932a-46ea-a2c3-3503a90c9aab",\n' +
            '"33adf424-8c04-4859-a9d7-e8a0859e4e1c",\n' +
            '"0269473f-b883-45ca-acb1-ab0955f488c1",\n' +
            '"d2c26f84-3ba1-4d11-90a8-bf95e0162ce7");\n' +
            '\n' +
            '\n' +
            'SET SQL_SAFE_UPDATES = 1;\n' +
            '\n' +
            '\n');
        //await db.query('UPDATE districts SET position = 33 WHERE ID = 11');
    }
}
