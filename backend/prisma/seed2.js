require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main(){
    const resumeData = [
        {
            c_id:"course-101",
            r_key_words:["JavaScript","React","Node.js"],
        },
        {
            c_id:"course-102",
            r_key_words:["Java","Spring Boot","Microservices"],
        },
        {
            c_id:"course-103",
            r_key_words:["Python","Django","Machine Learning"],
        },
        {
            c_id:"course-104",
            r_key_words:["C++","Data Structures","Algorithms"],
        },
        {
            c_id:"course-105",
            r_key_words:["Ruby","Rails","Web Development"],
        },
        {
            c_id:"course-106",
            r_key_words:["PHP","Laravel","Backend Development"],
        },
        {
            c_id:"course-107",
            r_key_words:["Swift","iOS","Mobile Development"],
        },
        {
            c_id:"course-108",
            r_key_words:["Kotlin","Android","Mobile Development"],
        },
        {
            c_id:"course-109",
            r_key_words:["Go","Golang","Cloud Computing"],
        },
        {
            c_id:"course-110",
            r_key_words:["Rust","Systems Programming","Concurrency"],
        },
        {
            c_id:"course-111",
            r_key_words:["TypeScript","Angular","Frontend Development"],
        },
        {
            c_id:"course-112",
            r_key_words:["Scala","Akka","Reactive Programming"],
        },
        {
            c_id:"course-113",
            r_key_words:["Elixir","Phoenix","Functional Programming"],
        },
        {
            c_id:"course-114",
            r_key_words:["C#","ASP.NET","Web Development"],
        },
        {
            c_id:"course-115",
            r_key_words:["Dart","Flutter","Cross-platform Development"],
        },
        {
            c_id:"course-116",
            r_key_words:["R","Data Science","Statistics"],
        },
        {
            c_id:"course-117",
            r_key_words:["MATLAB","Simulink","Engineering"],
        },
        {
            c_id:"course-118",
            r_key_words:["Julia","Scientific Computing","Numerical Analysis"],
        },
        {
            c_id:"course-119",
            r_key_words:["Haskell","Functional Programming","Type Theory"],
        },
        {
            c_id:"course-120",
            r_key_words:["Perl","Scripting","Text Processing"],
        },
    ];
    for (const data of resumeData) {
        await prisma.resume.upsert({
          where: { c_id: data.c_id },
          update: { r_key_words: data.r_key_words },
          create: {
            c_id: data.c_id,
            r_key_words: data.r_key_words,
            r_previous_resume_shortlisted: [],
          },
        });
      }
}
main()
.then(()=> console.log("Resume data seeded successfully"))
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });