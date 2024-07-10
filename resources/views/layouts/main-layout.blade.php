<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Header -->
    @include('layouts.header')

    @yield('style')

    @vite('resources/css/app.css')
    <title>BNRDEVV - WEB</title>
</head>

<body class="dark">

    @include('layouts.navbar')

    <!-- Content Section -->
    <div class="main-content overflow-x-hidden min-h-screen">
        @yield('content')
    </div>

    <!-- Script Section -->
    @yield('scripts')



    @include('layouts.script')
</body>

</html>
