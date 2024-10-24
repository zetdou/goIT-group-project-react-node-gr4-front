# Aplikacja do zarządzania finansami osobistymi

## Opis

Ta aplikacja to zaawansowane narzędzie do zarządzania finansami osobistymi,
które umożliwia użytkownikom efektywne śledzenie wydatków i przychodów. Oferuje
intuicyjny interfejs i szereg funkcji ułatwiających kontrolę nad osobistym
budżetem.

## Główne funkcje

### 1. Zarządzanie wydatkami

Użytkownicy mogą łatwo dodawać, przeglądać i usuwać wydatki. Każda transakcja
zawiera szczegółowe informacje, takie jak data, opis, kategoria i kwota.

### 2. Zarządzanie przychodami

Podobnie jak w przypadku wydatków, aplikacja umożliwia kompleksowe zarządzanie
przychodami, pozwalając na dodawanie nowych wpisów i analizę istniejących.

### 3. Kategoryzacja transakcji

Aplikacja oferuje system kategoryzacji zarówno dla wydatków, jak i przychodów,
co znacznie ułatwia późniejszą analizę i planowanie budżetu.

### 4. Raporty i wykresy

Użytkownicy mają dostęp do zaawansowanych narzędzi do generowania raportów i
wykresów, które pomagają w wizualizacji i analizie ich finansów.

### 5. Zarządzanie saldem

Aplikacja automatycznie śledzi ogólne saldo użytkownika i umożliwia jego ręczną
aktualizację w razie potrzeby.

## Technologie

- React
- Redux
- React Router
- Axios
- React DatePicker
- Notiflix
- Google OAuth

## Struktura projektu

- `src/components`: Komponenty React
- `src/redux`: Logika Redux (slice'y i operacje asynchroniczne)
- `src/hooks`: Niestandardowe hooki React
- `src/pages`: Główne strony aplikacji

## Responsywność

Aplikacja jest w pełni responsywna i dostosowuje się do różnych rozmiarów
ekranów, od urządzeń mobilnych po desktopowe.

## Autoryzacja i bezpieczeństwo

Aplikacja wykorzystuje tokeny JWT do autoryzacji i odświeżania sesji
użytkownika, zapewniając bezpieczne korzystanie z serwisu.
