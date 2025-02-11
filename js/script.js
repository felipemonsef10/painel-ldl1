// Função para lidar com o clique dos botões
function handleClick(button, blockId, buttonIndex) {
    // Alternar estado do botão (vermelho ou verde)
    button.classList.toggle("pressed");

    const block = document.getElementById(blockId);
    const pressedButtons = block.querySelectorAll(".pressed");

    // Salvar estado do botão no localStorage
    saveButtonState(blockId, buttonIndex, button.classList.contains("pressed"));

    // Se pelo menos um botão estiver pressionado, a estação e o cabeçalho ficam vermelhos
    if (pressedButtons.length > 0) {
        block.classList.add("red");
        document.getElementById("header").classList.add("red");
    } else {
        // Se nenhum botão estiver pressionado, a estação e o cabeçalho voltam ao normal (verde)
        block.classList.remove("red");

        // Verificar se todas as estações estão sem botões pressionados para resetar o cabeçalho
        const allblocks = document.querySelectorAll(".line-item");
        const anyRedblock = Array.from(allblocks).some(st => st.classList.contains("red"));

        if (!anyRedblock) {
            document.getElementById("header").classList.remove("red");
        }
    }
}

// Função para salvar o estado dos botões no localStorage
function saveButtonState(blockId, buttonIndex, isPressed) {
    const blockState = JSON.parse(localStorage.getItem(blockId)) || {};
    blockState[`button${buttonIndex}`] = isPressed;
    localStorage.setItem(blockId, JSON.stringify(blockState));
}

// Função para salvar o conteúdo dos campos de texto no localStorage
function saveInputState(blockId, inputIndex, value) {
    const blockState = JSON.parse(localStorage.getItem(blockId)) || {};
    blockState[`input${inputIndex}`] = value;
    localStorage.setItem(blockId, JSON.stringify(blockState));
}

// Função para carregar o estado dos botões e campos de texto do localStorage
function loadblockState(blockId) {
    const blockState = JSON.parse(localStorage.getItem(blockId));
    if (blockState) {
        const block = document.getElementById(blockId);
        const buttons = block.querySelectorAll("button");
        const inputs = block.querySelectorAll("textarea");

        buttons.forEach((button, index) => {
            if (blockState[`button${index}`]) {
                button.classList.add("pressed");
                block.classList.add("red");
                document.getElementById("header").classList.add("red");
            }
        });

        inputs.forEach((input, index) => {
            if (blockState[`input${index}`] !== undefined) {
                input.value = blockState[`input${index}`];
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
    const blockIds = [
        'block1', 'block2', 'block3', 'block4', 'block5', 'block6',
        'block7', 'block8', 'block9', 'block10', 'block11', 'block12',
        'block13', 'block14', 'block15', 'block16', 'block17', 'block18',
        'block19', 'block20', 'block21', 'block22', 'block23', 'block24',
        'block25', 'block26', 'block27', 'block28', 'block29', 'block30',
        'block31', 'block32', 'block33', 'block34', 'block35', 'block36'
    ];
    blockIds.forEach(blockId => {
        loadblockState(blockId);
    });

    // Adicionar listeners aos campos de texto para salvar conteúdo e expandir dinamicamente
    blockIds.forEach(blockId => {
        const block = document.getElementById(blockId);
        const inputs = block.querySelectorAll("textarea");
        inputs.forEach((input, index) => {
            input.addEventListener("input", () => {
                saveInputState(blockId, index, input.value);
                adjustTextareaHeight(input);
            });
        });
    });
};
