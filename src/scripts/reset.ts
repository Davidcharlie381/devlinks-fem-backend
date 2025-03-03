import fs from "fs";

console.log("Started... \nRenaming...")
fs.cp(".env", ".env.example", (error) => {
  if (error) {
    return console.log("Failed to copy:", error);
  }
  return console.log("Renamed .env.example to .env")
});