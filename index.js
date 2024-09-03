// const fs = require("fs");
import fs from "fs";
// const path = require("path");
import path from "path";

// Function to parse the question content
function parseQuestion(questionText) {
  // Replace line breaks with a space
  questionText = questionText.replace(/(\r\n|\n|\r)/g, " ").trim();

  const yearMatch = questionText.match(/\((\d{4})\)/);
  const questionYear = yearMatch ? yearMatch[1] : null;

  const questionTextWithoutYear = questionText.replace(/\(\d{4}\)/, "").trim();

  const optionsMatch = questionTextWithoutYear.match(
    /(.*)\(a\)(.*)\(b\)(.*)\(c\)(.*)\(d\)(.*)/s
  );

  const questionContent = optionsMatch ? optionsMatch[1].trim() : "";
  const questionOptions = {
    a: optionsMatch ? optionsMatch[2].trim() : "",
    b: optionsMatch ? optionsMatch[3].trim() : "",
    c: optionsMatch ? optionsMatch[4].trim() : "",
    d: optionsMatch ? optionsMatch[5].trim() : "",
  };

  return {
    questionYear,
    questionText: questionContent,
    questionOptions,
  };
}

// Function to parse the answer and explanation content
function parseAnswer(answerText) {
  // Replace line breaks with a space
  answerText = answerText.replace(/(\r\n|\n|\r)/g, " ").trim();

  const correctOptionMatch = answerText.match(/Answer:\s*\((.)\)/);
  const questionCorrectOption = correctOptionMatch
    ? correctOptionMatch[1]
    : null;

  const questionAnswerExplanation = answerText
    .replace(/Answer:\s*\(.\)/, "")
    .trim();

  return {
    questionCorrectOption,
    questionAnswerExplanation,
  };
}

// Main function to read files, parse content, and generate JSON
function generateJSON() {
  const questionFilePath = "q.txt";
  const answerFilePath = "a.txt";
  const outputFilePath = "data.json";

  // Read the question and answer files
  const questionContent = fs.readFileSync(questionFilePath, "utf-8");
  const answerContent = fs.readFileSync(answerFilePath, "utf-8");

  // Parse the content
  const questionData = parseQuestion(questionContent);
  const answerData = parseAnswer(answerContent);

  // Combine the parsed data into a single JSON object
  const finalData = {
    questionYear: questionData.questionYear,
    questionText: questionData.questionText,
    questionOptions: questionData.questionOptions,
    questionCorrectOption: answerData.questionCorrectOption,
    questionAnswerExplanation: answerData.questionAnswerExplanation,
  };

  // Write the JSON object to the output file
  fs.writeFileSync(outputFilePath, JSON.stringify(finalData, null, 2), "utf-8");

  console.log("JSON data has been written to data.json");
}

// Run the function to generate JSON
generateJSON();
