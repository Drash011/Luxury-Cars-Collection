const carsContainer = document.getElementById("carsContainer");
const searchInput = document.getElementById("searchInput");
const brandFilter = document.getElementById("brandFilter");

const cars = [
    {
        name: "BMW M4",
        brand: "lamborghini",
        price: "₹10 Cr",
        image: "images/BMW-M4.jpg"
    },
    {
        name: "Audi R8",
        brand: "audi",
        price: "₹3.3 Cr",
        image: "images/Audi-R8.jpg"
    },
    {
        name: "Mercedes AMG GT",
        brand: "mercedes",
        price: "₹2.7 Cr",
        image: "images/Mercedes-AMG-GT.jpg"
    },
    {
        name: "Mercedes AMG GT",
        brand: "audi",
        price: "₹2.7 Cr",
        image: "images/Mercedes-AMG-GT2.jpg"
    },
    {
        name: "Lamborghini Huracan",
        brand: "lamborghini",
        price: "₹8.50 Cr",
        image: "images/Lamborghini-Huracan.jpg"
    },
    {
        name: "BMW i8",
        brand: "bmw",
        price: "₹3.6 Cr",
        image: "images/BMW-i8.jpg"
    },
    {
        name: "Rolls Royce Ghost",
        brand: "rr",
        price: "₹8.1 Cr",
        image: "images/Rolls-Royce-Ghost.jpg"
    },
    {
        name: "Rolls Royce Phantom",
        brand: "rr",
        price: "₹9 Cr",
        image: "images/Rolls-Royce-Phantom.jpg"
    }
];

function displayCars(filteredCars) {
    let html = "";

    if (filteredCars.length === 0) {
        carsContainer.innerHTML = `<div class="empty">No cars found 🚫</div>`;
        return;
    }

    filteredCars.forEach(car => {
        html += `
        <div class="car-card">
            <img src="${car.image}" alt="${car.name}">
            <div class="car-content">
                <h3>${car.name}</h3>
                <span class="brand">${formatBrand(car.brand)}</span>
                <div class="price-row">
                    <div class="price">${car.price}</div>
                    <button class="btn" onclick='viewDetails(${JSON.stringify(car)})'>Details</button>
                </div>
            </div>
        </div>`;
    });

    carsContainer.innerHTML = html;

    addTiltEffect();
}

function formatBrand(brand) {
    const map = {
        bmw: "BMW",
        audi: "Audi",
        mercedes: "Mercedes",
        lamborghini: "Lamborghini",
        rr: "Rolls Royce"
    };
    return map[brand] || brand;
}

function filterCars() {
    const searchValue = searchInput.value.toLowerCase();
    const selectedBrand = brandFilter.value;

    const filtered = cars.filter(car => {
        const matchName = car.name.toLowerCase().includes(searchValue);
        const matchBrand = selectedBrand === "all" || car.brand === selectedBrand;
        return matchName && matchBrand;
    });

    displayCars(filtered);
}

searchInput.addEventListener("keyup", filterCars);
brandFilter.addEventListener("change", filterCars);

displayCars(cars);

function viewDetails(car) {
    localStorage.setItem("selectedCar", JSON.stringify(car));
    window.location.href = "details.html";
}

function addTiltEffect() {
    const cards = document.querySelectorAll(".car-card");

    cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = -(y - centerY) / 15;
            const rotateY = (x - centerX) / 15;

            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "rotateX(0) rotateY(0) scale(1)";
        });
    });
}

const toggleBtn = document.getElementById("themeToggle");

function setThemeUI(isDark) {
    if (isDark) {
        document.body.classList.add("dark");
        toggleBtn.innerHTML = `<i class="fa-solid fa-sun"></i> Light`;
    } else {
        document.body.classList.remove("dark");
        toggleBtn.innerHTML = `<i class="fa-solid fa-moon"></i> Dark`;
    }
}

const savedTheme = localStorage.getItem("theme");
setThemeUI(savedTheme === "dark");

toggleBtn.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark");

    if (isDark) {
        localStorage.setItem("theme", "light");
        setThemeUI(false);
    } else {
        localStorage.setItem("theme", "dark");
        setThemeUI(true);
    }
});







function toggleWishlist(car) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.find(item => item.name === car.name);

    if (exists) {
        wishlist = wishlist.filter(item => item.name !== car.name);
    } else {
        wishlist.push(car);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
}