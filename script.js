// 1. Subjects ki list
const subjects = [
    { name: "Mathematics", icon: "📐" },
    { name: "Science", icon: "🧪" },
    { name: "English", icon: "📖" },
    { name: "Hindi", icon: "🕉️" },
    { name: "Social Studies", icon: "🌍" },
    { name: "Computer", icon: "💻" },
    { name: "General Knowledge", icon: "🧠" },
    { name: "Arts & Craft", icon: "🎨" }
];

// 2. Link Database (Aapka link yahan sahi format mein hai)
const bookLinks = {
    "3-Computer": "https://vardbook.b-cdn.net/ebook/xplorer/computer-3/index.html#p=1"
};

const bookGrid = document.getElementById('bookGrid');

// 3. Books generate karne ka function
function init() {
    for(let c=1; c<=8; c++) {
        subjects.forEach(sub => {
            const card = document.createElement('div');
            card.className = `card class-${c}`;
            card.setAttribute('data-class', c);
            
            const bookKey = `${c}-${sub.name}`;

            card.innerHTML = `
                <span class="sub-tag">${sub.name}</span>
                <div class="icon-box">${sub.icon}</div>
                <div class="title">Grade ${c} ${sub.name}</div>
                <button class="open-btn" onclick="openBook('${bookKey}')">OPEN EBOOK</button>
            `;
            bookGrid.appendChild(card);
        });
    }
}

// 4. Open Book Function (Isme hi error tha, ab theek hai)
function openBook(key) {
    // DHAYAN SE DEKHO: const ke baad space aur 'url' likha hai
    const url = bookLinks[key];

    if (url) {
        // Spinner dikhao
        const loader = document.getElementById('loader');
        if(loader) loader.style.display = 'flex';

        // Redirect logic
        setTimeout(() => {
            window.location.href = url;
        }, 800); 
    } else {
        alert("Bhai, is book ka link abhi update nahi hua hai!");
    }
}

// 5. Filter Logic
function filterClass(cls, btn) {
    document.querySelectorAll('.btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if(cls === 'all' || card.getAttribute('data-class') === cls) {
            card.classList.remove('hidden');
            card.style.display = ""; 
        } else {
            card.classList.add('hidden');
        }
    });
}

// 6. Search Logic
function filter() {
    let input = document.getElementById('search').value.toLowerCase();
    let cards = document.querySelectorAll('.card:not(.hidden)');
    cards.forEach(card => {
        let text = card.innerText.toLowerCase();
        card.style.display = text.includes(input) ? "block" : "none";
    });
}

// Start generating books
init();