# iconfont
Иконпаки одним файлом. Готовые CSS стили для подключения в папке dist/css

## Принцип работы

1. Скрипт преобразует все svg иконки в один файл шрифта формата woff
2. Генерируются CSS стили для иконок формата: {ICONPACK_PREFIX}-{SVGICON_NAME}. Где ICONPACK_PREFIX - префикс, который указывается при запуске сборщика в консоле, а SVGICON_NAME - название файла.
3. Создается CSS файл с закодированным в base64 шрифтом
4. Сгенерированные CSS файлы объединяются в один файл

## Установка

1. `git clone https://github.com/imitronov/iconfont.git`

2. `cd iconfont`

3. `yarn` или `npm i`

## Использование

1. В папке icons создаете свою папку и копируете в нее svg иконки

2. Выполняете команду `gulp --prefix "ICONPACK_PREFIX" --pack "ICONPACK_FOLDER"`, где ICONPACK_PREFIX - это префикс для иконок в генерируемом CSS, а ICONPACK_FOLDER - это папка с иконками в icons
