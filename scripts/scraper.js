const got = require("got");
const cheerio = require("cheerio");
const fs = require("fs");

const HOST = "http://gutenberg.org";

const getPage = async (url) => {
  try {
    const response = await got(url);
    return cheerio.load(response.body);
  } catch (error) {
    console.error(error.response.body);
  }
};

const scrapePage = async (url, books) => {
  const $ = await getPage(url);

  $(".booklink").each(async function () {
    const urlBase = $(this).find(".link").attr("href");
    const id = urlBase.match(/\d+/g)[0];
    const url = `${HOST}/files/${id}/${id}-h/${id}-h.htm`;

    try {
      const $ = await getPage(url);

      const book = {
        id,
        title: $(this).find(".title").text(),
        author: $(this).find(".subtitle").text(),
        coverImage: `${HOST}${$(this).find(".cover-thumb").attr("src")}`,
        pageBody: $("body")
          .html()
          .replace(
            /src="images/g,
            `src="http://gutenberg.org/files/${id}/${id}-h/images`
          )
          .replace(/<pre>.*?<\/pre>/gm, ""),
      };

      books.push(book);
    } catch (error) {
      console.log(`Error fetching book for ${url}: ${error}`);
    }
  });

  const nextPageLink = $("a[title='Go to the next page of results.']")
    .first()
    .attr("href");

  if (nextPageLink) {
    return scrapePage(`${HOST}${nextPageLink}`, books);
  } else {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(books);
      }, 2000);
    });
  }
};

(async () => {
  const books = await scrapePage(
    "http://gutenberg.org/ebooks/bookshelf/22",
    []
  );

  fs.writeFile("./data/books.json", JSON.stringify({ books }), (err) => {
    if (err) console.log(err);
    else {
      console.log("File written successfully");
    }
  });
})();
