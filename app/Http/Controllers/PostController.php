<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Http\Resources\PostCollection;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PostController extends Controller
{
    /**
     * Obtener todas las publicaciones
     */
    public function index()
    {
        return new PostCollection(Post::latest()->get());
    }

    /**
     * Crear una nueva publicación
     */
    public function store(PostRequest $request)
    {
        try {

            DB::beginTransaction();

            $imagenPath = null;
            
            // Guardar la imágen
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

            // Crear el post
            $post = Post::create([
                'titulo' => $request->titulo,
                'descripcion' => $request->descripcion,
                'contenido_multimedia' => $imagenPath,
            ]);

            // Guardar en BD
            DB::commit();

            // Mensajes al usuario
            return response()->json([
                'message' => 'Publicación creada correctamente.',
                'data' => $post
            ], 201);

        } catch (\Exception $e) { // Caso de error
            // Cancelar proceso
            DB::rollBack();

            // Mensajes al usuario
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
    public function update(PostRequest $request, Post $post)
    {
        $post->titulo = $request->titulo;
        $post->descripcion = $request->descripcion;

        if ($request->hasFile('contenido_multimedia')) {

            if ($post->contenido_multimedia) {
                Storage::disk('public')->delete($post->contenido_multimedia);
            }

            $path = $request->file('contenido_multimedia')
                ->store('posts', 'public');

            $post->contenido_multimedia = $path;
        }

        $post->save();

        return response()->json([
            'message' => 'Publicación actualizada correctamente.'
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $post = Post::find($id);

        try {

            if ($post->contenido_multimedia && Storage::disk('public')->exists($post->contenido_multimedia)) {
                Storage::disk('public')->delete($post->contenido_multimedia);
            }

            $post->delete();

            return response()->json([
                'message' => 'Publicación eliminada exitosamente.'
            ]);

        } catch (\Exception $e) {

            return response()->json([
                'message' => 'Error al eliminar la publicación.',
                "error" => $e->getMessage()
            ], 500);
        }
    }
}
