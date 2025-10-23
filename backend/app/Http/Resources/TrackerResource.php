<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TrackerResource extends JsonResource
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
            'id'          => $this->id,
            'time_in'     => $this->time_in,
            'time_out'    => $this->time_out,
            'total_hours' => $this->total_hours,
            'user_id'     => $this->user_id,
            'store_id'    => $this->store_id,
            'company_id'  => $this->company_id,

            // Include breaks data
            'breaks'      => TrackerBreakResource::collection($this->whenLoaded('breaks')),
        ];
    }
}
