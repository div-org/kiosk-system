<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookingResource extends JsonResource
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
            'id'            =>  $this->id,
            'title'         =>  $this->title,
            'start'         =>  $this->start_date,
            'end'           =>  $this->end_date,
            'store_id'      =>  $this->store_id,
            'user_id'       =>  $this->user_id,
            'created_at'    =>  $this->created_at->toDateTimeString(),
            'updated_at'    =>  $this->updated_at->toDateTimeString(),
        ];
    }
}
