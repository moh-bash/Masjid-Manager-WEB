
function FormUi({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-white rounded-lg shadow-md p-6">
            {children}
        </div>
    )
}

export default FormUi
