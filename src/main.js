const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
  { logo: "A", logoType: "text", url: "https://www.acfun.cn" },
  { logo: "B", logoType: "text", url: "https://www.bilibili.com" },
];

const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, "");
};

const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`
      <li>
        <a href="${node.url}">
            <div class="site">
            <div class="logo">${node.logo}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class="close" title="删除">
              <svg class="icon">
                <use xlink:href="#icon-cha"></use>
              </svg>
            </div>
            </div>
        </a>
      </li>
    `).insertBefore($lastLi);
    $li.on("click", ".close", (e) => {
      console.log("这里");
      e.stopPropagation();
      e.preventDefault();
      hashMap.splice(index, 1);
      render();
    });
  });
};

render();

$(".addButton").on("click", () => {
  let url = prompt("请问你要添加的网址是什么？");
  if (url.indexOf !== "http") {
    url = "https://" + url;
  }
  hashMap.push({
    logo: simplifyUrl(url)[0],
    logoType: "text",
    url: url,
  });
  render();
});

$(document).on("keypress", (e) => {
  const { key } = e;
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});

// window.onbeforeunload = () => {
//   const string = JSON.stringify(hashMap);
//   localStorage.setItem("x", string);
// };
