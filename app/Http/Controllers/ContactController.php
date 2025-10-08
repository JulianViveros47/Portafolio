<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function sendMail(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email',
            'message' => 'required|string',
        ]);

        try {
            // 👇 corregido
            $body = view('emails.contact_plain', ['data' => $validated])->render();

            Mail::send('emails.contact_plain', ['data' => $validated], function ($mail) use ($validated) {
                $mail->to('portafolioeider1@gmail.com')
                    ->subject('Nuevo mensaje de contacto')
                    ->from($validated['email'], $validated['name']);
            });


            return response()->json([
                'success' => true,
                'message' => 'Mensaje enviado con éxito 🚀'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al enviar el correo ❌',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
