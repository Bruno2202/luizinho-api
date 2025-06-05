-- CreateTable
CREATE TABLE "car" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "plate" VARCHAR(7),
    "renavam" VARCHAR(11),
    "chassis" VARCHAR(17),
    "manufactureYear" INTEGER,
    "modelYear" INTEGER,
    "mileage" INTEGER,
    "salePrice" DOUBLE PRECISION,
    "observation" TEXT,
    "sold" BOOLEAN NOT NULL DEFAULT false,
    "images" TEXT,
    "typeId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "transmissionId" INTEGER NOT NULL,
    "fuelId" TEXT NOT NULL,
    "colorId" INTEGER NOT NULL,
    "modelId" INTEGER NOT NULL,
    "brandId" INTEGER NOT NULL,

    CONSTRAINT "car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brand" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "model" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "color" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fuel" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "fuel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transmission" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "transmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "type" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "picture" TEXT,
    "cpf" VARCHAR(11) NOT NULL,
    "rg" VARCHAR(10),
    "birthDate" TEXT,
    "registrationDate" TEXT,
    "contact" TEXT,
    "address" TEXT,
    "neighborhood" TEXT,
    "number" INTEGER,
    "zipCode" INTEGER,
    "cityId" INTEGER NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "city" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "ufId" VARCHAR(2) NOT NULL,

    CONSTRAINT "city_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "state" (
    "id" VARCHAR(2) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "state_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "store" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "neighborhood" TEXT,
    "cnpj" TEXT,
    "contact" TEXT,

    CONSTRAINT "store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales_record" (
    "id" SERIAL NOT NULL,
    "entryDate" TIMESTAMP(3),
    "exitDate" TIMESTAMP(3),
    "purchaseValue" DOUBLE PRECISION,
    "costValue" DOUBLE PRECISION,
    "saleDate" TIMESTAMP(3),
    "observation" VARCHAR(255),
    "paymentCondition" TEXT,
    "carId" INTEGER NOT NULL,
    "sellerId" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,

    CONSTRAINT "sales_record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expense" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "expenseValue" DOUBLE PRECISION,

    CONSTRAINT "expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expense_record" (
    "expenseId" INTEGER NOT NULL,
    "salesRecordId" INTEGER NOT NULL,

    CONSTRAINT "expense_record_pkey" PRIMARY KEY ("expenseId","salesRecordId")
);

-- CreateIndex
CREATE UNIQUE INDEX "fuel_id_key" ON "fuel"("id");

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_fuelId_fkey" FOREIGN KEY ("fuelId") REFERENCES "fuel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_transmissionId_fkey" FOREIGN KEY ("transmissionId") REFERENCES "transmission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "city" ADD CONSTRAINT "city_ufId_fkey" FOREIGN KEY ("ufId") REFERENCES "state"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales_record" ADD CONSTRAINT "sales_record_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales_record" ADD CONSTRAINT "sales_record_carId_fkey" FOREIGN KEY ("carId") REFERENCES "car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales_record" ADD CONSTRAINT "sales_record_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense_record" ADD CONSTRAINT "expense_record_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "expense"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense_record" ADD CONSTRAINT "expense_record_salesRecordId_fkey" FOREIGN KEY ("salesRecordId") REFERENCES "sales_record"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
