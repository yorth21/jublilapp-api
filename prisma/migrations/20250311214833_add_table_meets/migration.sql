-- CreateTable
CREATE TABLE "Meets" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "doctor_name" TEXT NOT NULL,
    "description" VARCHAR(50) NOT NULL,

    CONSTRAINT "Meets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Meets" ADD CONSTRAINT "Meets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
