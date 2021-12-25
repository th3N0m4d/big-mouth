import fsPromises from "fs/promises";
import { default as Mustache } from "mustache";
import axios from "axios";
import path from "path";

const loadTemplate = async () => {
  const templatePath = path.join(__dirname, "..", "static", "index.html");
  const html = await fsPromises.readFile(templatePath, "utf-8");

  return html;
};

export const index = async () => {
  const template = await loadTemplate();
  const { data: restaurants } = await axios.get(
    `${process.env.API}restaurants`
  );
  const dayOfWeek = "Monday";

  const html = Mustache.render(template, { dayOfWeek, restaurants });

  return {
    statusCode: 200,
    body: html,
    headers: {
      "Content-Type": "text/html; charset=UTF-8",
    },
  };
};
