<?php

namespace App\Notifications;

use App\Models\Project;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ProjectUpdateNotification extends Notification
{
    use Queueable;

    protected $project;
    protected $changes; // associative array
    protected $projectOriginalName;

    /**
     * Create a new notification instance.
     */
    public function __construct(Project $project, array $changes, string $projectOriginalName)
    {
        $this->project = $project;
        $this->changes = $changes;
        $this->projectOriginalName = $projectOriginalName;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Projekt módosítás')
            ->greeting('Kedves Kapcsolattartó!')
            ->line("{$this->projectOriginalName} projekt adatai megváltoztak.")
            ->lineIf(isset($this->changes['name']), "A projekt új neve: " . ($this->changes['name'] ?? ''))
            ->lineIf(isset($this->changes['description']), "A projekt új leírása: " . ($this->changes['description'] ?? ''))
            ->lineIf(isset($this->changes['status']), "A projekt új státusza: " . ($this->changes['status'] ?? ''))
            ->lineIf(isset($this->changes['updated_at']), "Módosítás dátuma: {$this->changes['updated_at']}")
            ->action('Projektek megtekintése', url('/'));
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
