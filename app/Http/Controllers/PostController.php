<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Http\Resources\PostCollection;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new PostCollection(Post::latest()->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PostRequest $request)
    {
        try {

            DB::beginTransaction();

            $imagenPath = null;

            if ($request->hasFile('contenido_multimedia')) {

                $file = $request->file('contenido_multimedia');

                // Generar nombre único con UUID
                $uniqueName = Str::uuid() . '.' . $file->getClientOriginalExtension();

                // Guardar en storage/app/public/posts
                $imagenPath = $file->storeAs(
                    'posts',
                    $uniqueName,
                    'public'
                );
            }

            $post = Post::create([
                'titulo' => $request->titulo,
                'descripcion' => $request->descripcion,
                'contenido_multimedia' => $imagenPath,
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Publicación creada correctamente.',
                'data' => $post
            ], 201);

        } catch (\Exception $e) {

            DB::rollBack();

            return response()->json([
                'message' => 'Error al crear la publicación.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
