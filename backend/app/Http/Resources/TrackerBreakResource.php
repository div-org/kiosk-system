<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TrackerBreakResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    // public function toArray(Request $request): array
    // {
    //     return parent::toArray($request);
    // }
    public function toArray($request)
    {
        return [
            'id'           => $this->id,
            'break_in'     => $this->break_in,
            'break_out'    => $this->break_out,
            'total_break'  => $this->total_break,
        ];
    }
}
