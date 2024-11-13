// Função para lidar com o clique dos botões
function handleClick(button, stationId, buttonIndex) {
    // Alternar estado do botão (vermelho ou verde)
    button.classList.toggle("pressed");

    const station = document.getElementById(stationId);
    const pressedButtons = station.querySelectorAll(".pressed");

    // Salvar estado do botão no localStorage
    saveButtonState(stationId, buttonIndex, button.classList.contains("pressed"));

    // Se pelo menos um botão estiver pressionado, a estação e o cabeçalho ficam vermelhos
    if (pressedButtons.length > 0) {
        station.classList.add("red");
        document.getElementById("header").classList.add("red");
    } else {
        // Se nenhum botão estiver pressionado, a estação e o cabeçalho voltam ao normal (verde)
        station.classList.remove("red");

        // Verificar se todas as estações estão sem botões pressionados para resetar o cabeçalho
        const allStations = document.querySelectorAll(".station");
        const anyRedStation = Array.from(allStations).some(st => st.classList.contains("red"));

        if (!anyRedStation) {
            document.getElementById("header").classList.remove("red");
        }
    }
}

// Função para salvar o estado dos botões no localStorage
function saveButtonState(stationId, buttonIndex, isPressed) {
    const stationState = JSON.parse(localStorage.getItem(stationId)) || {};
    stationState[`button${buttonIndex}`] = isPressed;
    localStorage.setItem(stationId, JSON.stringify(stationState));
}

// Função para salvar o conteúdo dos campos de texto no localStorage
function saveInputState(stationId, inputIndex, value) {
    const stationState = JSON.parse(localStorage.getItem(stationId)) || {};
    stationState[`input${inputIndex}`] = value;
    localStorage.setItem(stationId, JSON.stringify(stationState));
}

// Função para carregar o estado dos botões e campos de texto do localStorage
function loadStationState(stationId) {
    const stationState = JSON.parse(localStorage.getItem(stationId));
    if (stationState) {
        const station = document.getElementById(stationId);
        const buttons = station.querySelectorAll("button");
        const inputs = station.querySelectorAll("textarea");

        buttons.forEach((button, index) => {
            if (stationState[`button${index}`]) {
                button.classList.add("pressed");
                station.classList.add("red");
                document.getElementById("header").classList.add("red");
            }
        });

        inputs.forEach((input, index) => {
            if (stationState[`input${index}`] !== undefined) {
                input.value = stationState[`input${index}`];
                adjustTextareaHeight(input);
            }
        });
    }
}

// Função para ajustar a altura do textarea automaticamente
function adjustTextareaHeight(textarea) {
    textarea.style.height = 'auto'; // Redefine a altura para auto
    textarea.style.height = textarea.scrollHeight + 'px'; // Ajusta para a altura necessária
}

// Carregar estado de todas as estações ao carregar a página
window.onload = function() {
    const stationIds = ['station1', 'station2', 'station3', 'station4', 'station5', 'station6'];
    stationIds.forEach(stationId => {
        loadStationState(stationId);
    });

    // Adicionar listeners aos campos de texto para salvar conteúdo e expandir dinamicamente
    stationIds.forEach(stationId => {
        const station = document.getElementById(stationId);
        const inputs = station.querySelectorAll("textarea");
        inputs.forEach((input, index) => {
            input.addEventListener("input", () => {
                saveInputState(stationId, index, input.value);
                adjustTextareaHeight(input);
            });
        });
    });
};
