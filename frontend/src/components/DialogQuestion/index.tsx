import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'

interface DialogQuestionProps {
  open: boolean
  onClose: () => void
}

export function DialogQuestion({ open, onClose }: DialogQuestionProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onClose}
    >
      <DialogContent className="flex flex-col gap-10 p-16 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">Parabéns</DialogTitle>
        </DialogHeader>
        <h2 className="text-center">Exibir score</h2>

        <Button onClick={onClose}>Ok</Button>
      </DialogContent>
    </Dialog>
  )
}
