/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Breadcrumb from "@/components/layouts/Breadcrumb";
import featureImg from "@/assets/images/features.webp";
import { useAllRiderRideQuery } from "@/redux/features/rides/rides.api";
import { BounceLoader } from "react-spinners";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

export default function RiderRideHistory() {
    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(10);

    const query = {
        page: currentPage.toString(),
        limit: limit.toString(),
    };

    const { data: ridesData, isLoading } = useAllRiderRideQuery(query);
    const rides = ridesData?.data?.data || [];
    const totalPage = ridesData?.data?.meta?.totalPage || 1;

    if (isLoading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <BounceLoader color="#f97316" size={80} />
            </div>
        );
    }

    return (
        <section>
            <Breadcrumb
                title="Ride History"
                description="Review all your past rides, payments, and trip details in one place."
                backgroundImage={featureImg}
            />

            {rides.length > 0 ? (
                <div className="max-w-7xl mx-auto p-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-md w-[120px] uppercase">Distance (km)</TableHead>
                                <TableHead className="text-md uppercase">Fare (৳)</TableHead>
                                <TableHead className="text-md uppercase">Status</TableHead>
                                <TableHead className="text-md uppercase">Transaction ID</TableHead>
                                <TableHead className="text-md uppercase">Completed At</TableHead>
                                <TableHead className="text-md uppercase">Invoice</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rides.map((ride: any) => (
                                <TableRow key={ride._id}>
                                    <TableCell>{ride.travelDistance.toFixed(2)}</TableCell>
                                    <TableCell>{ride.fare}</TableCell>
                                    <TableCell>
                                        <span
                                            className={`px-2 py-1 rounded-none text-xs font-medium ${
                                                ride.rideStatus === "COMPLETED"
                                                    ? "bg-green-100 text-green-700"
                                                    : ride.rideStatus === "IN_TRANSIT"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "bg-gray-100 text-gray-700"
                                            }`}
                                        >
                                            {ride.rideStatus}
                                        </span>
                                    </TableCell>
                                    <TableCell>{ride.payment?.transactionId ?? "N/A"}</TableCell>
                                    <TableCell>
                                        {ride.timestamps.completedAt
                                            ? new Date(ride.timestamps.completedAt).toLocaleString()
                                            : "N/A"}
                                    </TableCell>
                                    <TableCell>
                                        {ride.payment?.invoiceUrl ? (
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button size="sm" className="rounded-none" variant="outline">
                                                        View Invoice
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-4xl rounded-none">
                                                    <DialogHeader>
                                                        <DialogTitle>Invoice Preview</DialogTitle>
                                                    </DialogHeader>
                                                    <iframe
                                                        src={ride.payment.invoiceUrl}
                                                        className="w-full h-[80vh] rounded"
                                                        title="Invoice PDF"
                                                    />
                                                </DialogContent>
                                            </Dialog>
                                        ) : (
                                            <span className="text-muted-foreground">N/A</span>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Pagination */}
                    {totalPage > 1 && (
                        <div className="flex justify-end mt-4 w-full">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                        />
                                    </PaginationItem>
                                    {Array.from({ length: totalPage }, (_, index) => index + 1).map((page) => (
                                        <PaginationItem key={page} onClick={() => setCurrentPage(page)}>
                                            <PaginationLink isActive={currentPage === page}>{page}</PaginationLink>
                                        </PaginationItem>
                                    ))}
                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPage))}
                                            className={currentPage === totalPage ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    )}
                </div>
            ) : (
                <p className="text-center text-muted-foreground py-10">
                    You don’t have any rides yet.
                </p>
            )}
        </section>
    );
}
