import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProducts } from "@/contexts/ProductContext";
import { useOrder } from "@/contexts/OrderContext";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Product } from "@/contexts/ProductContext";

// Form schema for product validation
const productFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Product name must be at least 3 characters." }),
  price: z.coerce
    .number()
    .positive({ message: "Price must be a positive number." }),
  sizes: z.array(z.string()).min(1),
  colors: z.array(z.string()).min(1),
  category: z.enum(["men", "women", "accessories"], {
    message: "Please select a valid category.",
  }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  image: z.string().url({ message: "Please provide a valid image URL." }),
});

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { orders } = useOrder();

  // State for dialogs
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  // Form setup
  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      sizes: [],
      colors: [],
      price: 0,
      category: "men",
      description: "",
      image: "/placeholder.svg",
    },
  });

  useEffect(() => {
    // Check if admin is authenticated
    const adminAuth = localStorage.getItem("adminAuthenticated");
    if (adminAuth !== "true") {
      navigate("/admin");
      toast({
        title: "Access Denied",
        description: "Please login to access the admin dashboard.",
        variant: "destructive",
      });
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  useEffect(() => {
    // Reset form when currentProduct changes
    if (currentProduct) {
      form.reset({
        name: currentProduct.name,
        sizes: currentProduct.sizes,
        colors: currentProduct.colors,
        price: currentProduct.price,
        category: currentProduct.category,
        description: currentProduct.description,
        image: currentProduct.image,
      });
    }
  }, [currentProduct, form]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    navigate("/admin");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const markAsDelivered = (orderId: string) => {
    // In a real app, this would update the order status in the database
    toast({
      title: "Order Updated",
      description: `Order #${orderId} has been marked as delivered.`,
    });
  };

  const handleAddProduct = () => {
    setCurrentProduct(null);
    form.reset({
      name: "",
      price: 0,
      category: "men",
      description: "",
      image: "/placeholder.svg",
    });
    setIsAddDialogOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setIsEditDialogOpen(true);
  };

  const handleDeleteProduct = (product: Product) => {
    setCurrentProduct(product);
    setIsDeleteDialogOpen(true);
  };

  const onAddSubmit = (data: z.infer<typeof productFormSchema>) => {
    const newProduct: Product = {
      id: `p${products.length + 1}`,
      name: data.name,
      price: data.price,
      category: data.category,
      description: data.description,
      image: data.image,
      colors: data.colors || ["black", "white"],
      sizes: data.sizes || ["S", "M", "L"],
      featured: false,
      newArrival: false
    
    };

    addProduct(newProduct);
    toast({
      title: "Product Added",
      description: `${data.name} has been added to the catalog.`,
    });
    setIsAddDialogOpen(false);
  };

  const onEditSubmit = (data: z.infer<typeof productFormSchema>) => {
    if (currentProduct) {
      const updatedProduct: Product = {
        ...currentProduct,
        ...data,
      };

      updateProduct(updatedProduct);
      toast({
        title: "Product Updated",
        description: `${data.name} has been updated.`,
      });
      setIsEditDialogOpen(false);
    }
  };

  const confirmDelete = () => {
    if (currentProduct) {
      deleteProduct(currentProduct.id);
      toast({
        title: "Product Deleted",
        description: `${currentProduct.name} has been removed from the catalog.`,
      });
      setIsDeleteDialogOpen(false);
    }
  };

  if (!isAuthenticated) {
    return null; // Don't render anything if not authenticated (will redirect)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-brand-purple text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Button
              variant="danger"
              className="border border-white hover:bg-red-400 hover:text-white"
              onClick={handleLogout}
            >
              Logout
            </Button>
            <Button
              variant="default"
              className="border border-white hover:bg-brand-dark-purple hover:text-white"
              onClick={() => navigate("/")}
            >
              View Store
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>

              {orders.length === 0 ? (
                <p className="text-gray-500">No orders found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                          Order ID
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                          Customer
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                          Date
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                          Total
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-4 py-4 text-sm">{order.id}</td>
                          <td className="px-4 py-4 text-sm">
                            {order.customerName}
                          </td>
                          <td className="px-4 py-4 text-sm">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-4 text-sm">
                            ${order.total.toFixed(2)}
                          </td>
                          <td className="px-4 py-4 text-sm">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                order.status === "delivered"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {order.status.charAt(0).toUpperCase() +
                                order.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-sm">
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  navigate(`/order-details/${order.id}`)
                                }
                              >
                                View
                              </Button>
                              {order.status !== "delivered" && (
                                <Button
                                  size="sm"
                                  onClick={() => markAsDelivered(order.id)}
                                >
                                  Mark Delivered
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">Total Orders</h3>
                <p className="text-3xl font-bold">{orders.length}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">Pending Delivery</h3>
                <p className="text-3xl font-bold">
                  {
                    orders.filter((order) => order.status !== "delivered")
                      .length
                  }
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">Delivered</h3>
                <p className="text-3xl font-bold">
                  {
                    orders.filter((order) => order.status === "delivered")
                      .length
                  }
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                  Products ({products.length})
                </h2>
                <Button onClick={handleAddProduct}>Add New Product</Button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        ID
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Image
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Price
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Category
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Inventory
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td className="px-4 py-4 text-sm">{product.id}</td>
                        <td className="px-4 py-4">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-12 w-12 object-cover rounded"
                          />
                        </td>
                        <td className="px-4 py-4 text-sm font-medium">
                          {product.name}
                        </td>
                        <td className="px-4 py-4 text-sm">
                          ${product.price.toFixed(2)}
                        </td>
                        <td className="px-4 py-4 text-sm">
                          {product.category}
                        </td>
                        <td className="px-4 py-4 text-sm">
                          {product.sizes.length} sizes
                        </td>
                        <td className="px-4 py-4 text-sm">
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditProduct(product)}
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteProduct(product)}
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">Total Products</h3>
                <p className="text-3xl font-bold">{products.length}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">Low Stock Items</h3>
                <p className="text-3xl font-bold">
                  {
                    products.filter((product) => product.sizes.length < 2)
                      .length
                  }
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">Categories</h3>
                <p className="text-3xl font-bold">
                  {new Set(products.map((product) => product.category)).size}
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onAddSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Flex container for price, sizes and colors */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="sizes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sizes</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="S, M, L, XL"
                            {...field}
                            onChange={(e) => {
                              const sizes = e.target.value
                                .split(",")
                                .map((s) => s.trim());
                              field.onChange(sizes);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="colors"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Colors</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="white, black, gray"
                            {...field}
                            onChange={(e) => {
                              const colors = e.target.value
                                .split(",")
                                .map((c) => c.trim());
                              field.onChange(colors);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <select
                        className="w-full p-2 border border-gray-300 rounded-md"
                        {...field}
                      >
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="accessories">Accessories</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <textarea
                        className="w-full p-2 border border-gray-300 rounded-md"
                        rows={3}
                        placeholder="Enter product description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="/placeholder.svg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Add Product</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onEditSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Flex container for price, sizes and colors */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="sizes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sizes</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="S, M, L, XL"
                            value={field.value?.join(", ")}
                            onChange={(e) => {
                              const sizes = e.target.value
                                .split(",")
                                .map((s) => s.trim());
                              field.onChange(sizes);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="colors"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Colors</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="white, black, gray"
                            value={field.value?.join(", ")}
                            onChange={(e) => {
                              const colors = e.target.value
                                .split(",")
                                .map((c) => c.trim());
                              field.onChange(colors);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <select
                        className="w-full p-2 border border-gray-300 rounded-md"
                        {...field}
                      >
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="accessories">Accessories</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <textarea
                        className="w-full p-2 border border-gray-300 rounded-md"
                        rows={3}
                        placeholder="Enter product description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="/placeholder.svg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Update Product</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {currentProduct?.name} from your
              product catalog. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminDashboard;
