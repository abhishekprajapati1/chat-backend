const { PrismaClient } = require("@prisma/client");
const Prisma = new PrismaClient();

const prisma = (req, res, next) => {
    req.prisma = Prisma;
    next();
};

module.exports = prisma;