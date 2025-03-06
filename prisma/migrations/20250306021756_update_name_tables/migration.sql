/*
  Warnings:

  - You are about to drop the `comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `likert_scale` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `psychological_dimension` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `psychological_question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `psychological_response` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `psychological_test` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vocational_answer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vocational_category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vocational_question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vocational_response` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vocational_test` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_post_id_fkey";

-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_user_id_fkey";

-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_user_id_fkey";

-- DropForeignKey
ALTER TABLE "psychological_question" DROP CONSTRAINT "psychological_question_dimension_id_fkey";

-- DropForeignKey
ALTER TABLE "psychological_response" DROP CONSTRAINT "psychological_response_question_id_fkey";

-- DropForeignKey
ALTER TABLE "psychological_response" DROP CONSTRAINT "psychological_response_scale_id_fkey";

-- DropForeignKey
ALTER TABLE "psychological_response" DROP CONSTRAINT "psychological_response_test_id_fkey";

-- DropForeignKey
ALTER TABLE "psychological_test" DROP CONSTRAINT "psychological_test_user_id_fkey";

-- DropForeignKey
ALTER TABLE "vocational_answer" DROP CONSTRAINT "vocational_answer_category_id_fkey";

-- DropForeignKey
ALTER TABLE "vocational_answer" DROP CONSTRAINT "vocational_answer_question_id_fkey";

-- DropForeignKey
ALTER TABLE "vocational_response" DROP CONSTRAINT "vocational_response_answer_id_fkey";

-- DropForeignKey
ALTER TABLE "vocational_response" DROP CONSTRAINT "vocational_response_test_id_fkey";

-- DropForeignKey
ALTER TABLE "vocational_test" DROP CONSTRAINT "vocational_test_user_id_fkey";

-- DropTable
DROP TABLE "comment";

-- DropTable
DROP TABLE "likert_scale";

-- DropTable
DROP TABLE "post";

-- DropTable
DROP TABLE "psychological_dimension";

-- DropTable
DROP TABLE "psychological_question";

-- DropTable
DROP TABLE "psychological_response";

-- DropTable
DROP TABLE "psychological_test";

-- DropTable
DROP TABLE "user";

-- DropTable
DROP TABLE "vocational_answer";

-- DropTable
DROP TABLE "vocational_category";

-- DropTable
DROP TABLE "vocational_question";

-- DropTable
DROP TABLE "vocational_response";

-- DropTable
DROP TABLE "vocational_test";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "names" VARCHAR(150) NOT NULL,
    "last_names" VARCHAR(150) NOT NULL,
    "identification" VARCHAR(20) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "address" VARCHAR(150) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "password" VARCHAR(256) NOT NULL,
    "birth_date" DATE NOT NULL,
    "gender" CHAR(1) NOT NULL,
    "job" VARCHAR(200) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vocational_tests" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "vocational_tests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vocational_questions" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "vocational_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vocational_categories" (
    "id" SERIAL NOT NULL,
    "code" CHAR(1) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "vocational_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vocational_answers" (
    "id" SERIAL NOT NULL,
    "question_id" INTEGER NOT NULL,
    "answer" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "vocational_answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vocational_responses" (
    "id" SERIAL NOT NULL,
    "test_id" INTEGER NOT NULL,
    "answer_id" INTEGER NOT NULL,

    CONSTRAINT "vocational_responses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "psychological_tests" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "psychological_tests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "psychological_dimensions" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "psychological_dimensions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "psychological_questions" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "dimension_id" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "psychological_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likert_scales" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "likert_scales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "psychological_responses" (
    "id" SERIAL NOT NULL,
    "test_id" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,
    "scale_id" INTEGER NOT NULL,

    CONSTRAINT "psychological_responses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_identification_key" ON "users"("identification");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "vocational_categories_code_key" ON "vocational_categories"("code");

-- CreateIndex
CREATE UNIQUE INDEX "likert_scales_value_key" ON "likert_scales"("value");

-- AddForeignKey
ALTER TABLE "vocational_tests" ADD CONSTRAINT "vocational_tests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vocational_answers" ADD CONSTRAINT "vocational_answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "vocational_questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vocational_answers" ADD CONSTRAINT "vocational_answers_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "vocational_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vocational_responses" ADD CONSTRAINT "vocational_responses_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "vocational_tests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vocational_responses" ADD CONSTRAINT "vocational_responses_answer_id_fkey" FOREIGN KEY ("answer_id") REFERENCES "vocational_answers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "psychological_tests" ADD CONSTRAINT "psychological_tests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "psychological_questions" ADD CONSTRAINT "psychological_questions_dimension_id_fkey" FOREIGN KEY ("dimension_id") REFERENCES "psychological_dimensions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "psychological_responses" ADD CONSTRAINT "psychological_responses_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "psychological_tests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "psychological_responses" ADD CONSTRAINT "psychological_responses_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "psychological_questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "psychological_responses" ADD CONSTRAINT "psychological_responses_scale_id_fkey" FOREIGN KEY ("scale_id") REFERENCES "likert_scales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
