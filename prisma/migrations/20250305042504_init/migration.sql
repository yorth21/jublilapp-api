-- CreateTable
CREATE TABLE "user" (
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

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vocational_test" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "vocational_test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vocational_question" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "vocational_question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vocational_category" (
    "id" SERIAL NOT NULL,
    "code" CHAR(1) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "vocational_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vocational_answer" (
    "id" SERIAL NOT NULL,
    "question_id" INTEGER NOT NULL,
    "answer" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "vocational_answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vocational_response" (
    "id" SERIAL NOT NULL,
    "test_id" INTEGER NOT NULL,
    "answer_id" INTEGER NOT NULL,

    CONSTRAINT "vocational_response_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "psychological_test" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "psychological_test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "psychological_dimension" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "psychological_dimension_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "psychological_question" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "dimension_id" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "psychological_question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likert_scale" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "likert_scale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "psychological_response" (
    "id" SERIAL NOT NULL,
    "test_id" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,
    "scale_id" INTEGER NOT NULL,

    CONSTRAINT "psychological_response_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_identification_key" ON "user"("identification");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "vocational_category_code_key" ON "vocational_category"("code");

-- CreateIndex
CREATE UNIQUE INDEX "likert_scale_value_key" ON "likert_scale"("value");

-- AddForeignKey
ALTER TABLE "vocational_test" ADD CONSTRAINT "vocational_test_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vocational_answer" ADD CONSTRAINT "vocational_answer_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "vocational_question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vocational_answer" ADD CONSTRAINT "vocational_answer_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "vocational_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vocational_response" ADD CONSTRAINT "vocational_response_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "vocational_test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vocational_response" ADD CONSTRAINT "vocational_response_answer_id_fkey" FOREIGN KEY ("answer_id") REFERENCES "vocational_answer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "psychological_test" ADD CONSTRAINT "psychological_test_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "psychological_question" ADD CONSTRAINT "psychological_question_dimension_id_fkey" FOREIGN KEY ("dimension_id") REFERENCES "psychological_dimension"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "psychological_response" ADD CONSTRAINT "psychological_response_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "psychological_test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "psychological_response" ADD CONSTRAINT "psychological_response_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "psychological_question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "psychological_response" ADD CONSTRAINT "psychological_response_scale_id_fkey" FOREIGN KEY ("scale_id") REFERENCES "likert_scale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
