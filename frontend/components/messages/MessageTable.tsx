import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@components/ui/table";
import { Button } from "@components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { EditMessageDialog } from "@components/messages/EditMessageDialog";

interface MessagesTableProps {
  messages: { id: number; content: string }[];
  openDialogId: number | null;
  setOpenDialogId: (id: number | null) => void;
  onDelete: (id: number) => void;
  onSuccessEdit: () => void;
}

const headers = ["ID", "Wiadomość", "Akcje"];

export function MessagesTable({
  messages,
  openDialogId,
  setOpenDialogId,
  onDelete,
  onSuccessEdit,
}: MessagesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headers.map((label) => (
            <TableHead key={label}>{label}</TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {messages.map((msg) => (
          <TableRow key={msg.id} className="sm:table-row">
            <TableCell
              data-label="ID"
              className="before:content-[attr(data-label)]:before:font-semibold before:block sm:before:hidden text-sm font-medium text-muted-foreground sm:font-semibold sm:text-black whitespace-normal break-words"
            >
              {msg.id}
            </TableCell>
            <TableCell
              data-label="Wiadomość"
              className="before:content-[attr(data-label)]:before:font-semibold before:block sm:before:hidden text-[10px] sm:text-sm whitespace-normal break-words"
            >
              {msg.content}
            </TableCell>
            <TableCell
              data-label="Akcje"
              className="before:content-[attr(data-label)]:before:font-semibold before:block sm:before:hidden sm:whitespace-nowrap mt-2 sm:mt-0"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  onClick={() => setOpenDialogId(msg.id)}
                  className="flex items-center justify-center gap-1 w-full sm:w-auto"
                >
                  <Pencil className="w-4 h-4" />
                  <span className="sr-only sm:not-sr-only">Edytuj</span>
                </Button>
                {openDialogId === msg.id && (
                  <EditMessageDialog
                    id={msg.id}
                    initialContent={msg.content}
                    onCloseAction={() => setOpenDialogId(null)}
                    onSuccessAction={onSuccessEdit}
                  />
                )}
                <Button
                  variant="destructive"
                  onClick={() => onDelete(msg.id)}
                  className="flex items-center justify-center gap-1 w-full sm:w-auto"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="sr-only sm:not-sr-only">Usuń</span>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
