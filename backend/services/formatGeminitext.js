module.exports.formatGeminiText = (text)=>{
    return text
    .replace(/Skills:/g, '\n\n🔹 Skills:')
    .replace(/Experience:/g, '\n\n🔹 Experience:')
    .replace(/Education:/g, '\n\n🔹 Education:')
    .replace(/Keyword Score:/g, '\n\n🔹 Keyword Score:')
    .replace(/Strengths:/g, '\n\n✅ Strengths:')
    .replace(/Weaknesses:/g, '\n\n⚠️ Weaknesses:')
    .replace(/Job Fit:/g, '\n\n🎯 Job Fit:')
    .replace(/Areas for Improvement:/g, '\n\n🛠️ Areas for Improvement:')
    .trim();
}