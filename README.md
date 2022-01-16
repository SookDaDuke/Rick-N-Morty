## Welcome to GitHub Pages

You can use the [editor on GitHub](https://github.com/SookDaDuke/sookdaduke.github.io/edit/main/README.md) to maintain and preview the content for your website in Markdown files.

Whenever you commit to this repository, GitHub Pages will run [Jekyll](https://jekyllrb.com/) to rebuild the pages in your site, from the content in your Markdown files.

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" type="text/css" href="style.css">
  <title>Coffee Clicker</title>
</head>

<body>
  <div class="column-container">
    <div class="column">
      <div class="container left">
        <div class="counter-container">Coffee: <span id="coffee_counter">0</span></div>
        <div class="cps-container"><span id="cps">0</span> coffee/second</div>
        <div id="big_coffee">☕️</div>
      </div>
    </div>
    <div class="column">
      <div class="column-header">Coffee Producers</div>
      <div class="container right" id="producer_container">
      </div>
    </div>
    <script type="text/javascript" src="data.js"></script>
    <script type="text/javascript" src="script.js"></script>
</body>

</html>
