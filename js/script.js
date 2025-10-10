document.addEventListener('DOMContentLoaded', function() {

    const userName = prompt("Please enter your name:", "Guest");
    const welcomeSpeechElement = document.getElementById('welcome-speech');
    if (welcomeSpeechElement) { welcomeSpeechElement.textContent = ` ${userName || "Guest"}`; }

    const contactForm = document.getElementById('contact-form');
    const formError = document.getElementById('form-error');
    const dataContainer = document.getElementById('submitted-data-container');
    const storageKey = 'submittedMessages';

    // Buka Tutup Pesan
    const messagesHeader = document.getElementById('messages-header');
    const collapsibleContent = document.getElementById('collapsible-messages');
    const messagesArrow = document.getElementById('messages-arrow');

    if (messagesHeader) {
        messagesHeader.addEventListener('click', function() {
            collapsibleContent.classList.toggle('expanded');
            if (collapsibleContent.classList.contains('expanded')) {
                messagesArrow.style.transform = 'rotate(180deg)';
            } else {
                messagesArrow.style.transform = 'rotate(0deg)';
            }
        });
    }
    
    function displayMessage(messageData) {
        const submissionDiv = document.createElement('div');
        submissionDiv.className = 'border-b p-4 mb-4 bg-white rounded-md shadow-sm';

        const table = document.createElement('table');
        table.className = 'message-table'; 

        table.innerHTML = `
            <tbody>
                <tr>
                    <td class="label">Nama</td>
                    <td class="colon">:</td>
                    <td>${messageData.name}</td>
                </tr>
                <tr>
                    <td class="label">Tanggal Lahir</td>
                    <td class="colon">:</td>
                    <td>${messageData.birthdate}</td>
                </tr>
                <tr>
                    <td class="label">Jenis Kelamin</td>
                    <td class="colon">:</td>
                    <td>${messageData.gender}</td>
                </tr>
                <tr>
                    <td class="label">Pesan</td>
                    <td class="colon">:</td>
                    <td>${messageData.message}</td>
                </tr>
                <tr>
                    <td class="label">Waktu</td>
                    <td class="colon">:</td>
                    <td>${messageData.time}</td>
                </tr>
            </tbody>
        `;

        submissionDiv.appendChild(table);
        dataContainer.prepend(submissionDiv);
    }

    // Local Storage
    function loadMessages() {
        const messagesString = localStorage.getItem(storageKey);
        if (messagesString) {
            const messages = JSON.parse(messagesString);
            if (messages.length > 0) {
                dataContainer.innerHTML = ''; 
                messages.forEach(msg => {
                    displayMessage(msg);
                });
            }
        }
    }

    loadMessages();

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('name-input').value.trim();
            const birthdate = document.getElementById('birthdate-input').value;
            const genderElement = document.querySelector('input[name="gender"]:checked');
            const message = document.getElementById('message-input').value.trim();
            
            if (name === '' || birthdate === '' || !genderElement || message === '') {
                formError.textContent = 'Harap isi semua kolom yang tersedia!';
                return;
            }
            formError.textContent = '';
            
            const gender = genderElement.value;
            const currentTime = new Date().toLocaleString('id-ID', {
                dateStyle: 'medium',
                timeStyle: 'short'
            });

            const newMessage = {
                name: name,
                birthdate: birthdate,
                gender: gender,
                message: message,
                time: currentTime
            };

            const existingMessages = JSON.parse(localStorage.getItem(storageKey)) || [];
            existingMessages.push(newMessage);
            localStorage.setItem(storageKey, JSON.stringify(existingMessages));

            if (dataContainer.querySelector('p.text-gray-500')) {
                dataContainer.innerHTML = '';
            }
            
            displayMessage(newMessage);
            contactForm.reset();
        });
    }

    // Animasi Kartu Portofolio
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    if (portfolioCards.length > 0) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        portfolioCards.forEach(card => {
            observer.observe(card);
        });
    }
});