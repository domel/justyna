# Testy z ustaw

Statyczna aplikacja webowa do nauki przepisów prawnych poprzez testy jednokrotnego wyboru.

Postęp nauki oraz niedokończone sesje są zapisywane lokalnie w przeglądarce. Po ponownym otwarciu test jest kontynuowany od ostatniego pytania. Pytanie, na które udzielono poprawnej odpowiedzi w dwóch kolejnych ukończonych sesjach, nie pojawia się w następnych testach. Każde pytanie można też ręcznie usunąć z puli po potwierdzeniu tej decyzji. Przycisk „Przywróć wszystkie pytania” na stronie głównej zeruje ten postęp, przywraca ręcznie usunięte pytania i usuwa niedokończone sesje.

Wersja opublikowana: [https://domel.github.io/justyna/](https://domel.github.io/justyna/)

## Instalacja na telefonie

Aplikacja działa jako PWA i po pierwszym pełnym wczytaniu może być używana bez połączenia z internetem.

Na Androidzie:

1. Otwórz opublikowaną stronę w Chrome na Androidzie.
2. Naciśnij „Zainstaluj aplikację” na stronie głównej i potwierdź instalację.

Przycisk pojawia się tylko na Androidzie, gdy Chrome udostępnia instalację, i znika po zainstalowaniu aplikacji. W Firefoksie należy wybrać z menu przeglądarki „Zainstaluj aplikację” albo „Dodaj do ekranu głównego”.

Zainstalowana aplikacja ma własną ikonę i uruchamia się w osobnym oknie. Chrome zapewnia pełny tryb instalacji PWA; Firefox obsługuje dodanie aplikacji do ekranu głównego i jej działanie offline.

## Uruchomienie lokalne

Aplikacja wczytuje pliki CSV przez `fetch()`, dlatego należy uruchomić ją przez lokalny serwer HTTP, np.:

```bash
python3 -m http.server 8000
```

Następnie otwórz:

```text
http://localhost:8000/
```

Możliwe jest również wejście bezpośrednio do testu, np.:

```text
http://localhost:8000/index.html?quiz=kpa
http://localhost:8000/index.html?quiz=lasy
http://localhost:8000/index.html?quiz=przyroda
```

## Technologia

- HTML5
- CSS3
- vanilla JavaScript
- Web App Manifest
- Service Worker i Cache API
- brak backendu i procesu budowania

## Aktualizowanie wersji offline

Plik `sw.js` zapisuje pliki aplikacji i zestawy pytań w pamięci podręcznej. Po zmianie zasobów umieszczonych w tablicy `APP_FILES` należy zwiększyć wersję w stałej `CACHE_NAME`, np. z `testy-z-ustaw-v4` na `testy-z-ustaw-v5`. Dzięki temu zainstalowane aplikacje usuną poprzedni cache i pobiorą aktualną wersję.
