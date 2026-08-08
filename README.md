# Testy z ustaw

Statyczna aplikacja webowa do nauki przepisów prawnych poprzez testy jednokrotnego wyboru.

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
- brak backendu i procesu budowania
