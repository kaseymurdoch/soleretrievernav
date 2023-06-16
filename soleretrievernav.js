const listOfBrands = document.getElementById("dynamic-list");
const listOfBrandItems = document.getElementById("mobile-nav-wrapper");
const mobileNavList = document.getElementById("mobile-nav-list");
const desktopNavWrapper = document.getElementById("new-nav-wrapper");
const desktopNavDropdown = document.getElementById("new-nav-dropdown");
const desktopContainer = document.getElementById("new-nav-container");

fetch("https://api-v3.soleretriever.com/.netlify/functions/get-nav-content")
  .then((response) => response.json())
  .then((data) => {
    const brands = data.navContent.filter(
      (item) =>
        item.sections.length > 0 && item.name !== "Upcoming Sneaker Releases"
    );
    const brandsDesktop = data.navContent.filter(
      (item) => item.sections.length > 0
    );

    brandsDesktop.forEach((brand) => {
      const brandTitle = document.createElement("div");
      brandTitle.textContent = brand.name;
      brandTitle.classList.add(`b-text-nav-desktop`);
      desktopNavWrapper.appendChild(brandTitle);

      const productList = document.createElement("div");
      productList.classList.add(`new-nav-page-desktop`);
      productList.classList.add("hidden"); // Initially hide the productList
      brandTitle.addEventListener("mouseover", () => {
        const allProductLists = document.querySelectorAll(
          ".new-nav-page-desktop"
        );
        const allBrandTitles = document.querySelectorAll(".b-text-nav-desktop");
        allBrandTitles.forEach((title) => {
          title.classList.remove("hovered"); // Hide other product lists
        });
        allProductLists.forEach((list) => {
          if (list !== productList) {
            list.classList.add("hidden"); // Hide other product lists
          }
        });
        productList.classList.remove("hidden");
        brandTitle.classList.add("hovered");
      });
      desktopNavDropdown.appendChild(productList);

      brand.sections.forEach((section) => {
        if (section.relatedLinks && section.relatedLinks.length > 0) {
          const sectionDiv = document.createElement("div");
          sectionDiv.classList.add(`nav-section-desktop`);
          productList.appendChild(sectionDiv);
          if (section.title) {
            const sectionTitle = document.createElement("div");
            sectionTitle.textContent = section.title;
            sectionTitle.classList.add(`nav-title-desktop`);
            sectionDiv.appendChild(sectionTitle);
          }

          section.relatedLinks.forEach((item) => {
            const anchor = document.createElement("a");
            anchor.classList.add(`nav-link-desktop`);
            anchor.href = `https://soleretriever.com${item.href}`;
            sectionDiv.appendChild(anchor);

            const itemText = document.createElement("div");
            itemText.textContent = item.name;
            anchor.appendChild(itemText);
          });
        }
        if (section.relatedNews && section.relatedNews.length > 0) {
          const sectionDiv = document.createElement("div");
          sectionDiv.classList.add(`nav-section-desktop`);
          productList.appendChild(sectionDiv);
          if (section.title) {
            const sectionTitle = document.createElement("div");
            sectionTitle.textContent = section.title;
            sectionTitle.classList.add(`nav-title-desktop`);
            sectionDiv.appendChild(sectionTitle);
          }

          section.relatedLinks.forEach((item) => {
            const anchor = document.createElement("a");
            anchor.classList.add(`nav-link-desktop`);
            anchor.href = `https://soleretriever.com${item.href}`;
            sectionDiv.appendChild(anchor);

            const itemText = document.createElement("div");
            itemText.textContent = item.name;
            anchor.appendChild(itemText);
          });
        }
      });
    });

    brands.forEach((brand) => {
      const brandLi = document.createElement("li");
      brandLi.classList.add(`footer-list-item`);
      listOfBrands.appendChild(brandLi);

      const brandA = document.createElement("a");
      brandA.classList.add(`b-nav-link`);
      brandLi.appendChild(brandA);

      const brandText = document.createElement("div");
      brandText.classList.add(`b-text-nav`);
      brandA.appendChild(brandText);
      brandText.textContent = `${brand.name} releases`;

      const productList = document.createElement("ul");
      productList.classList.add(`b-nav_list-copy`);
      productList.classList.add("hidden"); // Initially hide the productList
      brandA.addEventListener("click", () => {
        const allProductLists = document.querySelectorAll(".b-nav_list-copy");
        allProductLists.forEach((list) => {
          if (list !== productList) {
            list.classList.add("hidden"); // Hide other product lists
          }
        });
        productList.classList.toggle("hidden"); // Toggle visibility on brand click
      });
      listOfBrandItems.appendChild(productList);

      const backButton = document.createElement("a");
      backButton.classList.add(`b-nav-back`);
      productList.appendChild(backButton);

      const sectionImg = document.createElement("img");
      sectionImg.src = `https://uploads-ssl.webflow.com/6179bd8bf2c3bb21501fa460/648b7f33bad2a224a038eeb6_Feather-arrows-arrow-left.svg.png`;
      sectionImg.classList.add(`b-nav-img`);
      backButton.appendChild(sectionImg);

      const backText = document.createElement("div");
      backText.classList.add(`b-text-back`);
      backButton.appendChild(backText);
      backText.textContent = brand.name;

      backButton.addEventListener("click", () => {
        productList.classList.toggle("hidden"); // Toggle visibility on brand click
        mobileNavList.classList.remove("hidden");
        listOfBrands.classList.remove("hidden");
      });

      // Generate Popular Shoes section
      // Generate sections
      brand.sections.forEach((section) => {
        if (section.relatedLinks && section.relatedLinks.length > 0) {
          const sectionDiv = document.createElement("div");
          sectionDiv.classList.add(`b-nav-link`);
          productList.appendChild(sectionDiv);

          const sectionTitle = document.createElement("div");
          sectionTitle.textContent = section.title;
          sectionTitle.classList.add(`b-text-nav`);
          sectionDiv.appendChild(sectionTitle);

          section.relatedLinks.forEach((item) => {
            const listItem = document.createElement("li");
            listItem.classList.add(`footer-list-item`);
            productList.appendChild(listItem);

            const anchor = document.createElement("a");
            anchor.classList.add(`b-nav-link`);
            anchor.href = `https://soleretriever.com${item.href}`;
            listItem.appendChild(anchor);

            const itemText = document.createElement("div");
            itemText.textContent = item.name;
            itemText.classList.add(`b-text-nav`);
            anchor.appendChild(itemText);
          });
        }
      });
    });

    desktopContainer.addEventListener("mouseout", () => {
      const allProductLists = document.querySelectorAll(
        ".new-nav-page-desktop"
      );
      const allBrandTitles = document.querySelectorAll(".b-text-nav-desktop");
      allBrandTitles.forEach((title) => {
        title.classList.remove("hovered"); // Hide other product lists
      });
      allProductLists.forEach((list) => {
        list.classList.add("hidden"); // Hide other product lists
      });
    });
  })
  .catch((error) => {
    console.log("An error occurred:", error);
  });
