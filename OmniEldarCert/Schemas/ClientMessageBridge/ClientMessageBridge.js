 define("ClientMessageBridge", ["ConfigurationConstants"],
    function(ConfigurationConstants) {
        return {
            // Сообщения.
            messages: {
                // Имя сообщения.
                "OmniToursCreated": {
                    // Тип сообщения — широковещательное, без указания конкретного подписчика.
                    "mode": Terrasoft.MessageMode.BROADCAST,
                    // Направление сообщения — публикация.
                    "direction": Terrasoft.MessageDirectionType.PUBLISH
                }
            },
            methods: {
                // Инициализация схемы.
                init: function() {
                    // Вызов родительского метода.
                    this.callParent(arguments);
                    // Добавление нового конфигурационного объекта в коллекцию конфигурационных объектов.
                    this.addMessageConfig({
                        // Имя сообщения, получаемого по WebSocket.
                        sender: "OmniToursCreated",
                        // Имя сообщения, с которым оно будет разослано.
                        messageName: "OmniToursCreated"
                    });
                },
                // Метод, выполняемый после публикации сообщения.
                afterPublishMessage: function(
                    // Имя сообщения, с которым оно было разослано.
                    sandboxMessageName,
                    // Содержимое сообщения.
                    webSocketBody,
                    // Результат отправки сообщения.
                    result,
                    // Конфигурационный объект рассылки сообщения.
                    publishConfig) {
                    // Проверка, что сообщение соответствует добавленному в конфигурационный объект.
                    if (sandboxMessageName === "OmniToursCreated") {
                        // Сохранение содержимого в локальные переменные.
                        var birthday = webSocketBody.birthday;
                        var name = webSocketBody.name;
                        // Вывод содержимого в консоль браузера.
                        window.console.info("Опубликовано сообщение: " + sandboxMessageName);
                    }
                }
            }
        };
    });