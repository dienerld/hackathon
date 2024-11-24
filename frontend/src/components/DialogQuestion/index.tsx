import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'

interface DialogQuestionProps {
  open: boolean
  onClose: () => void
  report: {
    loading: boolean
    total: number
    corrects: number
    score: number
  }
}

export function DialogQuestion({ open, onClose, report }: DialogQuestionProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onClose}
    >
      <DialogContent className="flex flex-col gap-10 p-16 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">Parabéns</DialogTitle>
        </DialogHeader>

        {report.loading
          ? (
              <p>Loading...</p>
            )
          : (
              <>
                <h2 className="text-center">
                  Total:
                  {report.total}
                </h2>
                <h2 className="text-center">
                  Acertos:
                  {report.corrects}
                </h2>
                <h2 className="text-center">
                  Pontuação:
                  {report.score}
                </h2>
              </>
            )}

        <Button onClick={onClose}>Ok</Button>
      </DialogContent>
    </Dialog>
  )
}
