import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Dots from "@/assets/icons/dots.svg";
import { TableProps } from "@/types/TableProps";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import React, { useState } from 'react';

export function ProductTable<T>({ data = [], headers, keys, onRowClick, onDelete, showActions = true }: TableProps<T>) {
	const [isConfirmationOpen, setisConfirmationOpen] = useState(false);
	const handleDeleteClick = () => {
		setisConfirmationOpen(true);
	};
	return (
		<div className="w-full bg-white rounded-lg overflow-x-auto">
			<Table className="min-w-full border border-gray-300">
				<TableHeader className="cursor-default">
					<TableRow>
						{headers.map((header, index) => (
							<TableHead key={index} className="max-w-full">
								{header}
							</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody className="cursor-pointer">
					{data.length === 0 ? (
						<TableRow>
							<TableCell
								colSpan={headers.length + (showActions ? 1 : 0)}
								className="text-center"
							>
								No results found...
							</TableCell>
						</TableRow>
					) : (
						data.map((item, index) => (
							<TableRow
								key={index}
								onClick={() => {
									onRowClick && onRowClick(item);
								}}
							>
								<TableCell className="font-medium">
									{String(index + 1).padStart(2, "0")}
								</TableCell>
								{keys.map((key, keyIndex) => (
									<TableCell key={keyIndex}>{item[key] as string}</TableCell>
								))}
								{showActions && (
									<TableCell className="border-none">
										<DropdownMenu>
											<DropdownMenuTrigger className="p-2 flex items-center">
												<img src={Dots} width={15} height={15} />
											</DropdownMenuTrigger>
											<DropdownMenuContent>
												<DropdownMenuItem
													className="text-red-700 font-bold"
													onClick={(e) => {
														e.stopPropagation();
														onDelete && onDelete(item);
													}}
												>
													Delete
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								)}
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</div>
	);
}