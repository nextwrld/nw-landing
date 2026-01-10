---
description: Eliminar toda la funcionalidad de autenticación del proyecto
---

# Tarea: Eliminar Autenticación del Landing Page

## Objetivo
Remover completamente toda la funcionalidad de autenticación (next-auth, login, sign in/out) del proyecto ya que es una landing page que no requiere estas características.

## Análisis de Componentes a Eliminar

### 1. Directorios Completos
- `/src/components/Auth/` - Todos los componentes de autenticación
- `/src/app/(site)/(auth)/` - Páginas de signin, signup, forgot-password, reset-password
- `/src/app/api/auth/` - API routes de next-auth

### 2. Archivos Individuales
- `/src/utils/auth.ts` - Configuración de next-auth
- `/.env.local` - Variables de entorno de autenticación (recién creado)

### 3. Dependencias a Remover
- `next-auth`
- `@auth/prisma-adapter`
- `bcrypt` (solo usado para auth)
- `@types/bcrypt`

### 4. Código a Modificar

#### Header Component (`/src/components/Header/index.tsx`)
- Remover import de `signOut, useSession` de next-auth
- Eliminar lógica de sesión
- Remover botones de Sign In / Sign Up
- Simplificar el header para landing page

#### Menu Data (`/src/components/Header/menuData.tsx`)
- Remover items de menú: signIn, signUp

#### Providers (`/src/app/providers.tsx`)
- Remover `SessionProvider` de next-auth
- Mantener solo ThemeProvider

#### Traducciones
- `/src/i18n/en.ts` - Remover sección "auth"
- `/src/i18n/es.ts` - Remover sección "auth"
- `/src/locales/en/common.json` - Remover referencias a auth
- `/src/locales/es/common.json` - Remover referencias a auth

## Plan de Implementación

### Paso 1: Eliminar Directorios y Archivos
```bash
# Eliminar componentes de autenticación
rm -rf src/components/Auth/

# Eliminar páginas de autenticación
rm -rf src/app/(site)/(auth)/

# Eliminar API de autenticación
rm -rf src/app/api/auth/

# Eliminar configuración de auth
rm src/utils/auth.ts

# Eliminar archivo de variables de entorno
rm .env.local
```

### Paso 2: Actualizar Header Component
- Remover imports de next-auth
- Eliminar estado de sesión
- Simplificar navegación (solo: Home, About, Pricing, Contact, Blog)
- Remover botones de Sign In/Sign Up

### Paso 3: Actualizar Menu Data
- Mantener solo items relevantes para landing page
- Remover referencias a /signin y /signup

### Paso 4: Actualizar Providers
- Remover SessionProvider
- Mantener solo ThemeProvider y i18n

### Paso 5: Limpiar Traducciones
- Remover sección "auth" de archivos de traducción
- Remover "signIn" y "signUp" del menú en traducciones

### Paso 6: Desinstalar Dependencias
```bash
pnpm remove next-auth @auth/prisma-adapter bcrypt @types/bcrypt
```

### Paso 7: Verificar y Limpiar
- Buscar referencias restantes a "next-auth"
- Verificar que no haya imports rotos
- Probar que el dev server inicie correctamente

## Beneficios
- ✅ Código más limpio y enfocado
- ✅ Menor tamaño del bundle
- ✅ Sin errores de next-auth
- ✅ Más rápido tiempo de build
- ✅ Menos dependencias a mantener

## Riesgos
- ⚠️ Si en el futuro necesitas autenticación, tendrás que reimplementarla
- ⚠️ Asegurarse de no romper otras funcionalidades (blog, contact form, etc.)
