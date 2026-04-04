(async () => {
    // Получаем внутренний URL расширения для твоего файла
    const src = chrome.runtime.getURL("./js/content-script.js");
    
    // Динамически импортируем его как модуль
    await import(src);
})();
