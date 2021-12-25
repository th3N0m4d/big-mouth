import fsPromises from "fs/promises";
import { default as Mustache } from "mustache";
import axios from "axios";
import path from "path";
import { aws4Interceptor } from "aws4-axios";

const interceptor = aws4Interceptor(
  {
    region: process.env.REGION,
    service: "execute-api",
  },
  {
    accessKeyId: "",
    secretAccessKey: "",
  }
);

axios.interceptors.request.use(interceptor);

const loadTemplate = async () => {
  const templatePath = path.join(__dirname, "..", "static", "index.html");
  const html = await fsPromises.readFile(templatePath, "utf-8");

  return html;
};

const getRestaurants = async () => {
  const { data } = await axios.get(`${process.env.API}restaurants`);

  return data;
};

export const index = async () => {
  try {
    const dayOfWeek = "Monday";
    const template = await loadTemplate();
    const restaurants = await getRestaurants();

    const html = Mustache.render(template, { dayOfWeek, restaurants });

    return {
      statusCode: 200,
      body: html,
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
      },
    };
  } catch (error) {
    console.log(error.message);
    return {
      statusCode: 500,
      body: `<h1>${error.message}</h1>`,
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
      },
    };
  }
};
