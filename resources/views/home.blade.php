@extends('layouts.main-layout')

@section('style')
@endsection

@section('content')
    <div x-data="homePage()" class="max-w-screen-xl mx-auto mt-10 mb-10">
        <h1 class="text-2xl mb-3">Hello, World.</h1>
        <div class="w-full">
            <button @click="open =!open"
                class="select-none mb-4 rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button">
                TOGGLE SHOW
            </button>
            <div :class="!open && 'opacity-0'" class="opacity-1 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center transition duration-500 ease-in-out">
                <template x-for="i in 12" :key="i">
                    <div class="flex flex-col justify-center items-center text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-64">
                        <div
                            class="mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl h-80">
                            <img src="https://docs.material-tailwind.com/img/team-3.jpg" alt="profile-picture" />
                        </div>
                        <div class="p-6 text-center">
                            <h4
                                class="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                Natalie Paisley
                            </h4>
                            <p
                                class="block font-sans text-base antialiased font-medium leading-relaxed text-transparent bg-clip-text bg-gradient-to-tr from-blue-gray-600 to-blue-gray-400">
                                CEO / Co-Founder
                            </p>
                        </div>
                        <div class="flex justify-center p-6 pt-2 gap-7">
                            <a href="#facebook"
                                class="block font-sans text-xl antialiased font-normal leading-relaxed text-transparent bg-clip-text bg-gradient-to-tr from-blue-600 to-blue-400">
                                <i class="fab fa-facebook" aria-hidden="true"></i>
                            </a>
                            <a href="#twitter"
                                class="block font-sans text-xl antialiased font-normal leading-relaxed text-transparent bg-clip-text bg-gradient-to-tr from-light-blue-600 to-light-blue-400">
                                <i class="fab fa-twitter" aria-hidden="true">
                                </i>
                            </a>
                            <a href="#instagram"
                                class="block font-sans text-xl antialiased font-normal leading-relaxed text-transparent bg-clip-text bg-gradient-to-tr from-purple-600 to-purple-400"><i
                                    class="fab fa-instagram" aria-hidden="true">
                                </i>
                            </a>
                        </div>
                    </div>
                </template>

            </div>
        </div>
    </div>
@endsection

@section('scripts')
    <script>
        function homePage() {
            return {
                open: true,
            }
        }
    </script>
@endsection
